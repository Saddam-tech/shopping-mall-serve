const DELIVERY_STATUS = {
	REQUEST_MADE : 0 
	, DONE : 1 
	, ON_TRANSIT : 2
	, IN_TRANSIT : 2
}
const ORDER_STATUS={
	PLACED : 0
	, UNDER_REVIEW : 1
	, ON_DELIVERY : 2
	, DONE_DELIVERY : 3	
//  '0: placed, 1: under review, 2: on delivery, 3: done delivery',

}

module.exports=  {
	ORDER_STATUS
	, DELIVERY_STATUS
}
