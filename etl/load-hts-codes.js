
const fs=require('fs')
const filepathofsrc='/home/ubuntu/cosho-serve-20221013/sql/hts.csv'

const db = require('../models')

let buf = fs.readFileSync ( filepathofsrc ) 
const LOGGER=console.log
let lines = buf.toString().split ( /\n/ )
for ( let idx = 1; idx<lines.length ; idx ++ ) {
	LOGGER( lines [ idx ] ) 

}

// LOGGER( )




