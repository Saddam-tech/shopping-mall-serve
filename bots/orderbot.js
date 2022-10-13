const { createrow, findall, findone, getrandomrow } = require("../utils/db");
const db = require("../models");
let { Op } = db.Sequelize;
var poissonProcess = require("poisson-process");
const axios = require("axios");
const LOGGER = console.log;
const STRINGER = JSON.stringify;

// let durations = [ 1,2,3,5, 10 ]
let durations = [1];
let bettypestr = "LIVE"; // DEMO
// const MAX_COUNT_BETS=2000
// let ONE_ORDER_PER_MILISEC = 100
const MAX_COUNT_BETS = 1000;
let ONE_ORDER_PER_MILISEC = 50; // 100

let count = 0;
const placebet = async (_) => {
  //	let asset = await getrandomrow( 'assets' , {  id : { [Op.lte] : 7 } } )
  //	let asset = await getrandomrow( 'assets' , { id : { [Op.lte] : 7 } } )
  //	let asset = await getrandomrow( 'assets' , {  id : 1 } )
  let asset = { id: 1 };
  let user = await getrandomrow("users", {
    nickname: { [Op.like]: `%testbot%` },
  });
  let amount = (Math.random() * 10).toFixed(1);
  let side = Math.random() > 0.5 ? 1 : 0;
  let dur = durations[Math.floor(Math.random() * durations.length)];
  // try{	let resp = await axios.post ( `https://options1.net:30718/bets/join/LIVE/${asset.id}/${amount}/${dur}/${side}`  , { id: user.id} )
  // try{	let resp = await axios.post ( `http://localhost:30708/bets/join/LIVE/${asset.id}/${amount}/${dur}/${side}`  , { id: user.id} )
  // try{	let resp = await axios.post ( `http://localhost:30708/bets/bot/join/LIVE/${asset.id}/${amount}/${dur}/${side}`  , { id: user.id} )
  // try{	let resp = await axios.post ( `http://localhost:34851/bets/bot/join/LIVE/${asset.id}/${amount}/${dur}/${side}/${user.id}`  , { id: user.id} )
  try {
    let resp = await axios.post(
      `http://localhost:34851/bets/bot/join/${bettypestr}/${asset.id}/${amount}/${dur}/${side}/${user.id}`,
      { id: user.id }
    );

    LOGGER(`@resp`, count, STRINGER(resp.data));
  } catch (err) {
    LOGGER(`@err`, err);
  }
};
const init_balances = async (_) => {
  const AMOUNT_TO_CHARGE = "" + 10 ** 12;
  let users = await db["users"].findAll({
    raw: true,
    where: { nickname: { [Op.like]: `testbot%` } },
  });
  users.forEach(async (elem) => {
    let { id } = elem;
    await db["balances"].upsert(
      { avail: AMOUNT_TO_CHARGE, total: AMOUNT_TO_CHARGE },
      { uid: id, type: "LIVE" }
    );
    await db["balances"].upsert(
      { avail: AMOUNT_TO_CHARGE, total: AMOUNT_TO_CHARGE },
      { uid: id, type: "DEMO" }
    );
    // ( { count : tickercount_BTCETH  } , { timeofdaystamp } )
  });
};
const main = async (_) => {
  //	await init_balances ()
  // 	const p = poissonProcess.create ( 2000 , _=>{ // 30 / min
  //	let count = 0
  const p = poissonProcess.create(ONE_ORDER_PER_MILISEC, async (_) => {
    // 600 / min
    await placebet();
    ++count;
    if (count > MAX_COUNT_BETS) {
      LOGGER(`exiting ${count}`);
      process.exit();
    }
  });
  p.start();
};
main();
/*
 insert into balances ( uid,total,avail,typestr ) values ( 136, 1000000000000 ,1000000000000 , 'LIVE' );
 insert into balances ( uid,total,avail,typestr ) values ( 136, 1000000000000 ,1000000000000 , 'DEMO' );
 insert into balances ( uid,total,avail,typestr ) values ( 137, 1000000000000 ,1000000000000 , 'LIVE' );
 insert into balances ( uid,total,avail,typestr ) values ( 137, 1000000000000 ,1000000000000 , 'DEMO' );
 insert into balances ( uid,total,avail,typestr ) values ( 138, 1000000000000 ,1000000000000 , 'LIVE' );
 insert into balances ( uid,total,avail,typestr ) values ( 138, 1000000000000 ,1000000000000 , 'DEMO' );
*/
