// Offline order-intent planner. It never sends requests or submits orders.
import {assessPreflight} from './risk.mjs';
export function prepareIntent(input={}){
 const gate=assessPreflight(input);
 const errors=[...gate.errors];
 if(typeof input.productId!=='string'||!/^[A-Z0-9]+-[A-Z0-9]+$/.test(input.productId))errors.push('INVALID_PRODUCT');
 if(!['BUY','SELL'].includes(input.side))errors.push('INVALID_SIDE');
 if(typeof input.strategyId!=='string'||!/^[a-z0-9_-]{3,48}$/.test(input.strategyId))errors.push('INVALID_STRATEGY');
 if(typeof input.clientOrderId!=='string'||!/^[a-zA-Z0-9_-]{12,64}$/.test(input.clientOrderId))errors.push('INVALID_IDEMPOTENCY_KEY');
 if(!Number.isSafeInteger(input.openOrders)||!Number.isSafeInteger(input.maxOpenOrders))errors.push('INVALID_ORDER_COUNT');
 if(!Number.isFinite(input.requestedNotionalEur)||input.requestedNotionalEur<=0)errors.push('INVALID_NOTIONAL');
 if(!Number.isFinite(input.totalAllocatedEur)||input.totalAllocatedEur<=0)errors.push('INVALID_ALLOCATION');
 if(!Number.isFinite(input.maxLossEur)||input.maxLossEur<=0)errors.push('INVALID_RISK_BUDGET');
 if(!Number.isFinite(input.maxDailyLossEur)||input.maxDailyLossEur<=0)errors.push('INVALID_DAILY_RISK_BUDGET');
 if(!Number.isFinite(input.marketMinNotionalEur)||input.marketMinNotionalEur<=0)errors.push('INVALID_MARKET_MINIMUM');
 if(!Number.isFinite(input.feesEur)||!Number.isFinite(input.estimatedSlippageEur)||input.feesEur+input.estimatedSlippageEur>input.maxLossEur)errors.push('COST_OVER_RISK_BUDGET');
 const unique=[...new Set(errors)];
 return Object.freeze({status:unique.length?'BLOCKED':'PREFLIGHT_ONLY',eligibleForSubmission:false,errors:unique,preview:unique.length?null:Object.freeze({productId:input.productId,side:input.side,requestedNotionalEur:input.requestedNotionalEur,clientOrderId:input.clientOrderId})});
}
