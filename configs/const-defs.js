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
	, CANCELED : 4
	, REFUNDED : 5
	, EXCHANGED : 6
	, RETURNED : 7
	, RETURNED_YET_NOT_RESOLVED : 7 
//  '0: placed, 1: under review, 2: on delivery, 3: done delivery',
}
const CER_REASON = {
		DELAY : 1
	, DEFECT : 2
	, CHANGE_MIND : 3
	, REMORSE : 3
	, DOES_NOT_FIT : 4
	, PAST_EXPIRY : 5
	, 
}
const CER_REASON_N2C = {
	1 : 'DELAY' 
	, 2 : 'DEFECT' 
	, 3 : 'CHANGE_MIND' 
//	, 3 : REMORSE 
	, 4 : 'DOES_NOT_FIT'  
	, 5 : 'PAST_EXPIRY' 
}
module.exports=  {
	ORDER_STATUS
	, DELIVERY_STATUS
	, CER_REASON
	, CER_REASON_N2C
}
