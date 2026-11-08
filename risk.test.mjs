import test from 'node:test';
import assert from 'node:assert/strict';
import {assessPreflight} from './risk.mjs';
const good={mode:'live',exchangeAuthenticated:true,derivativesAuthorized:true,integrationTestsPassed:true,manualLiveApproval:true,killSwitch:false,availableCollateralEur:10,requestedNotionalEur:2,totalAllocatedEur:10,maxLossEur:1,stopLossEur:.5,dailyLossEur:0,maxDailyLossEur:2,openOrders:0,maxOpenOrders:1,marketMinNotionalEur:1,feesEur:.02,estimatedSlippageEur:.01};
test('fails closed by default',()=>assert.equal(assessPreflight().eligible,false));
test('valid synthetic fixture passes only preflight',()=>assert.equal(assessPreflight(good).eligible,true));
for(const [key,value] of [['totalAllocatedEur',11],['availableCollateralEur',1],['marketMinNotionalEur',3],['stopLossEur',2],['dailyLossEur',2],['openOrders',1],['manualLiveApproval',false],['derivativesAuthorized',false],['killSwitch',true],['feesEur',2],['requestedNotionalEur',NaN]])test('blocks '+key,()=>assert.equal(assessPreflight({...good,[key]:value}).eligible,false));
