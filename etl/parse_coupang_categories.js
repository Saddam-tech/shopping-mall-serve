const fs=require('fs')

const fn='/home/ubuntu/coupang/coupang-categories.json'

let buf= fs.readFileSync ( fn ).toString()
let jdata = JSON.parse ( buf )
const LOGGER=console.log

false && LOGGER( jdata )

let { data } = jdata
let idx = 0
const db = require( '../models')

recurse_with_parent = async (elem, parent , level )=>{
	let { name , child , displayItemCategoryCode } = elem
	LOGGER( `${idx ++},${displayItemCategoryCode},${parent},${level},'${name}'`  )
	await db[ 'infocategory' ].create ( {
		name : name.substr( 0 , 400 ) 
		, code : displayItemCategoryCode 
		, level 
		, parent
	})
	if ( child && child.length ) {
		for ( let idx1 = 0 ; idx1 < child.length ; idx1 ++ ) {
			let child1 = child [ idx1 ]
			await	recurse_with_parent 	( child1 , displayItemCategoryCode , level+1 )
//			child.forEach ( async child1 => {await	recurse_with_parent 	( child1 , displayItemCategoryCode , level+1 )			} )
		}
	}
}
const main = _=>{
	recurse_with_parent ( data , 0 , 0 ) 

}
main ()

const recurse = elem   =>{
	let { name , child , displayItemCategoryCode } = elem
	LOGGER( `${idx ++},${displayItemCategoryCode},'${name}'`  )
	if ( child && child.length ) {
		child.forEach ( child1 => {		recurse ( child1 )
		})
	}
}
false && recurse ( data ) 

let { child } = jdata.data 
false && recurse ( child )

const prt_top_level = _=>{
child . forEach ((  elem , idx ) => {
	LOGGER( idx , elem )
})
}
false && prt_top_level() 

/** displayItemCategoryCode: 76844,
  name: '출산/유아동',
  status: 'ACTIVE',
  child: [
*/
/** name      | varchar(100)        | YES  |     | NULL                |                               |
| code        | varchar(20)         | YES  |     | NULL                |                               |
| description | varchar(300)        | YES  |     | NULL                |                               |
| uuid        | varchar(60)         | YES  |     | NULL                |                               |
| registrar   | varchar(60)         | YES  |     | NULL                |                               |
| registrarid | bigint(20) unsigned | YES  |     | NULL                |                               |
| level       | int(10) unsigned    | YES  |     | NULL                |                               |
| parent      | int(10) 
*/

