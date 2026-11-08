import test from 'node:test';
import assert from 'node:assert/strict';
import {prepareIntent} from './planner.mjs';
const base={mode:'live',exchangeAuthenticated:true,derivativesAuthorized:true,integrationTestsPassed:true,manualLiveApproval:true,killSwitch:false,availableCollateralEur:10,requestedNotionalEur:2,totalAllocatedEur:10,maxLossEur:1,stopLossEur:.5,dailyLossEur:0,maxDailyLossEur:2,openOrders:0,maxOpenOrders:1,marketMinNotionalEur:1,feesEur:.02,estimatedSlippageEur:.01,productId:'BTC-USD',side:'BUY',strategyId:'strategy_01',clientOrderId:'client-order-0001'};
test('default blocks',()=>assert.equal(prepareIntent().status,'BLOCKED'));
test('valid synthetic input remains non-executable',()=>{const x=prepareIntent(base);assert.equal(x.status,'PREFLIGHT_ONLY');assert.equal(x.eligibleForSubmission,false);assert.equal(Object.isFrozen(x),true)});
for(const [k,v] of [['requestedNotionalEur',0],['totalAllocatedEur',11],['availableCollateralEur',0],['derivativesAuthorized',false],['manualLiveApproval',false],['killSwitch',true],['productId',''],['side','HOLD'],['strategyId','x'],['clientOrderId','dup'],['openOrders',1],['feesEur',1.1],['maxDailyLossEur',0],['marketMinNotionalEur',3]])test('rejects '+k,()=>assert.equal(prepareIntent({...base,[k]:v}).status,'BLOCKED'));
