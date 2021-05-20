'use strict';

var ops = require('../index');

var _require = require('./api/util'),
    getOpsBalance = _require.getOpsBalance,
    countFee = _require.countFee,
    inputsOrOutputs = _require.inputsOrOutputs,
    validateTx = _require.validateTx,
    broadcastTx = _require.broadcastTx;

/**
 * @disc: 创建节点 dome
 * @date: 2019-10-18 10:37
 * @author: Wave
 */

var pri = '411fa90f7161a20f4624a4f00167fac6d5afd97a7e6815f60e66106c559564a1';
var pub = '031c810153d633a5167ec629af771296bad4f26eacfe4034c978afee12b6c4fd44';
var fromAddress = "tOPSeBaMuBCG7NkSyufjE76CVbPQMrZ5Q1v3s";
var amount = 2000100000000;
var remark = 'new agent...';

var agent = {
  agentAddress: fromAddress,
  packingAddress: "tOPSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG",
  rewardAddress: fromAddress,
  commissionRate: 12,
  deposit: 2000100000000
};

//调用新建节点
newAgent(pri, pub, fromAddress, 2, 1, amount, agent);

/**
 * 新建节点
 * @param pri
 * @param pub
 * @param fromAddress
 * @param assetsChainId
 * @param assetsId
 * @param amount
 * @param agent
 * @returns {Promise<*>}
 */
async function newAgent(pri, pub, fromAddress, assetsChainId, assetsId, amount, agent) {
  var balanceInfo = await getOpsBalance(fromAddress);
  var transferInfo = {
    fromAddress: fromAddress,
    assetsChainId: assetsChainId,
    assetsId: assetsId,
    amount: amount,
    fee: 100000
  };
  var inOrOutputs = await inputsOrOutputs(transferInfo, balanceInfo, 4);
  var tAssemble = await ops.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, remark, 4, agent);
  var txhex = await ops.transactionSerialize(pri, pub, tAssemble);
  //console.log(txhex);
  var result = await validateTx(txhex);
  if (result) {
    console.log(result.data.value);
    var results = await broadcastTx(txhex);
    if (results && result.data.value) {
      console.log("交易完成");
    } else {
      console.log("广播交易失败");
    }
  } else {
    console.log("验证交易失败");
  }
}