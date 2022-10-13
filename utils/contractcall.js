const {web3} = require( '../configs/configweb3')
const {abi : abierc20} =require( '../contracts/abi/ERC20')
const {contractaddr} = require('../configs/addresses')
const sha256 =require( "js-sha256");
const  LOGGER=console.log

let jcontracts = {}
const MAP_STR_ABI={
	ERC20 : abierc20
// , CALL_ROUTER : abicallrouter 
}
const getabistr_forfunction= jargs=>{let { contractaddress , abikind ,  methodname , aargs, nettype }=jargs;
	let contract; contractaddress=contractaddress.toLowerCase()
  if(jcontracts[contractaddress ]){ contract=jcontracts[contractaddress] }
  else {        contract=new web3.eth.Contract( MAP_STR_ABI[abikind] , contractaddress);    jcontracts[contractaddress ]=contract }
	return contract.methods[ methodname ](... aargs ).encodeABI()
}
const query_noarg = jargs=>{
	let {contractaddress , abikind , methodname , nettype }=jargs
	let contract; contractaddress=contractaddress.toLowerCase()
	if(jcontracts[contractaddress ]){ contract=jcontracts[contractaddress] }
	else {        contract=new web3.eth.Contract( MAP_STR_ABI[abikind] , contractaddress);    jcontracts[contractaddress ]=contract }
	return new Promise((resolve,reject)=>{
		contract.methods[ methodname ]( ).call((err,resp)=>{LOGGER('' , err,resp)
			if(err){resolve(null);return}
			resolve(resp)
		}).catch(err=>{resolve(null)})
	})
}
const query_with_arg = jargs=> {  // {contractaddress , methodname , aargs }=jargs
	let {contractaddress , abikind , methodname , aargs , nettype  }=jargs
	let contract; contractaddress=contractaddress.toLowerCase()
	if(jcontracts[contractaddress ]){ contract=jcontracts[contractaddress] }
	else {        contract=new web3.eth.Contract( MAP_STR_ABI[abikind] , contractaddress);    jcontracts[contractaddress ]=contract }
	return new Promise((resolve,reject)=>{
		contract.methods[ methodname ](	... aargs		).call((err,resp)=>{LOGGER('' , err,resp)
			if(err){resolve(null);return}
			resolve(resp)
		}).catch(err=>{resolve(null)})
	})
}

const query_with_arg_eth = (jargs) => {
	let { contractaddress, abikind, methodname, aargs } = jargs;
	let contract;
	contractaddress = contractaddress.toLowerCase();
	let sig = sha256(contractaddress + methodname);
	if (jcontracts[sig]) contract = jcontracts[sig];
	else {
	  contract = new web3.eth.Contract(MAP_STR_ABI[abikind], contractaddress);
	  jcontracts[sig] = contract;
	}
	return new Promise((resolve, reject) => {
	  contract.methods[methodname](...aargs)
		.call((err, resp) => {
		  console.log("", err, resp);
		  if (err) {
			resolve(null);
			return;
		  }
		  resolve(resp);
		})
		.catch((err) => {
		  resolve(null);
		});
	});
  };

  const query_with_arg_mumbai = (jargs) => {
	let { contractaddress, abikind, methodname, aargs } = jargs;
	let contract;
	contractaddress = contractaddress.toLowerCase();
	let sig = sha256(contractaddress + methodname);
	if (jcontracts[sig]) contract = jcontracts[sig];
	else {
	  contract = new web3.eth.Contract(MAP_STR_ABI[abikind], contractaddress);
	  jcontracts[sig] = contract;
	}
	return new Promise((resolve, reject) => {
	  contract.methods[methodname](...aargs)
		.call((err, resp) => {
		  console.log("", err, resp);
		  if (err) {
			resolve(null);
			return;
		  }
		  resolve(resp);
		})
		.catch((err) => {
		  resolve(null);
		});
	});
  };

const query_eth_balance=useraddress=>{
	return new Promise((resolve,reject)=>{
		web3.eth.getBalance( useraddress ).then(resp=>{
			resolve(resp)
		}).catch(err=>{resolve(null)})
	})
}

module.exports= {
	getabistr_forfunction
	, query_noarg
	, query_with_arg
	, query_eth_balance
}

