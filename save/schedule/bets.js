var express = require("express");
let { respok, resperr } = require("../utils/rest");
const { getobjtype } = require("../utils/common");
const jwt = require('jsonwebtoken');
const { auth } = require('../utils/authMiddleware');
const db = require('../models')
var moment = require('moment');
const LOGGER = console.log;
const cron = require("node-cron");
const axios = require("axios")

cron.schedule('*/1 * * * *', async()=>{
    console.log(
        '@Round Check',
        moment().format('HH:mm:ss'),
        '@binopt'
    );
    const timenow = moment().startOf('minute');
    console.log(timenow.unix())

    await db['bets'].findAll({
        where:{
            starting: timenow.unix()
        }
    })
    .then(async result=>{
        console.log(result.length)
        if(result.length>0){
            console.log('Retrieving data')
            console.log(result)
            await axios.get(`https://yfapi.net/v7/finance/options/0700.HK?date=${timenow.unix()}`, {headers:{'X-API-KEY': 'Jnn3UR7qCP5StJ8Nutvd8SSwQAdk1vn6TGDcFWn6'}})
            .then(({data})=>{
                let price = data.optionChain.result[0].quote.regularMarketPrice;
                console.log(price)
                result.map(v=>v.update({
                    startingPrice: data.optionChain.result[0].quote.regularMarketPrice
                }))
            })
        }
    })

    await db['bets'].findAll({
        where:{
            expiry: timenow.unix()
        },
        attributes:['uid', 'assetId', 'amount', 'starting', 'expiry', 'startingPrice', 'side', 'type']
    })
    .then(async expiryResult=>{
        console.log('EXPIRY')
        const dataObj = expiryResult.map(v=>v.get({ plain: true }))
        console.log("asdfasdf",dataObj)
        
        if (expiryResult.length>0){
            let betlog = await db['betlogs'].bulkCreate(dataObj);
            await db['bets'].destroy({where:{expiry: timenow.unix()}})
            console.log(betlog)
                await axios.get(`https://yfapi.net/v7/finance/options/0700.HK?date=${timenow.unix()}`, {headers:{'X-API-KEY': 'Jnn3UR7qCP5StJ8Nutvd8SSwQAdk1vn6TGDcFWn6'}})
                .then(async ({data})=>{
                    
                    let eprice = data.optionChain.result[0].quote.regularMarketPrice;
                    console.log("closing", eprice)
                    await betlog.map(v=>v.update({
                        endingPrice: eprice
                    }))
                })
                
            

        }
    })

    await db['bets'].findAll({
        where:{
            expiry: timenow.unix(),
            group: "assetId"
        },
        raw: true
    })
    .then(result=>{
        console.log(result)
    })

})