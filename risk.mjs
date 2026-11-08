// Pure preflight only: no API calls, no order execution.
export const MAX_TOTAL_EUR=10;
export function assessPreflight(x={}){
 const errors=[];
 for(const [k,expected] of Object.entries({mode:'live',exchangeAuthenticated:true,derivativesAuthorized:true,integrationTestsPassed:true,manualLiveApproval:true,killSwitch:false}))if(x[k]!==expected)errors.push('REQUIRED_'+k);
 const keys=['availableCollateralEur','requestedNotionalEur','totalAllocatedEur','maxLossEur','stopLossEur','dailyLossEur','maxDailyLossEur','openOrders','maxOpenOrders','marketMinNotionalEur','feesEur','estimatedSlippageEur'];
 const valid=v=>typeof v==='number'&&Number.isFinite(v)&&v>=0;
 for(const k of keys)if(!valid(x[k]))errors.push('INVALID_'+k);
 if(valid(x.totalAllocatedEur)&&x.totalAllocatedEur>MAX_TOTAL_EUR)errors.push('TOTAL_CAPITAL_LIMIT');
 if(valid(x.requestedNotionalEur)&&valid(x.totalAllocatedEur)&&x.requestedNotionalEur>x.totalAllocatedEur)errors.push('EXCEEDS_ALLOCATION');
 if(valid(x.requestedNotionalEur)&&valid(x.availableCollateralEur)&&x.requestedNotionalEur>x.availableCollateralEur)errors.push('INSUFFICIENT_COLLATERAL');
 if(valid(x.requestedNotionalEur)&&valid(x.marketMinNotionalEur)&&x.requestedNotionalEur<x.marketMinNotionalEur)errors.push('BELOW_MARKET_MINIMUM');
 if(valid(x.stopLossEur)&&valid(x.maxLossEur)&&x.stopLossEur>x.maxLossEur)errors.push('STOP_LOSS_EXCEEDS_BUDGET');
 if(valid(x.dailyLossEur)&&valid(x.maxDailyLossEur)&&x.dailyLossEur>=x.maxDailyLossEur)errors.push('DAILY_LOSS_LIMIT');
 if(valid(x.openOrders)&&valid(x.maxOpenOrders)&&x.openOrders>=x.maxOpenOrders)errors.push('OPEN_ORDER_LIMIT');
 if(valid(x.feesEur)&&valid(x.estimatedSlippageEur)&&valid(x.requestedNotionalEur)&&x.feesEur+x.estimatedSlippageEur>=x.requestedNotionalEur)errors.push('COST_EXCEEDS_NOTIONAL');
 return {eligible:errors.length===0,errors};
}
