
const call = require('./contractCall.js');

/**
 * @disc: 调用合约dome - token授权
 * @date: 2019-10-18 10:28
 * @author: Wave
 */
// 用户私钥
let pri = 'ddddb7cb859a467fbe05d5034735de9e62ad06db6557b64d7c139b6db856b200';
// 用户公钥
let pub = '02cb7d76b7e91d60fa3c10298b414e5fe711aed8011b583e366b918d27fc262d73';
// 用户地址
let fromAddress = "tOPSeBaMshNPEnuqiDhMdSA4iNs6LMgjY6tcL";
// 业务合约地址
let busContractAddress = "tOPSeBaN9xz9PveeGrfigVBw9cCryTN25G8xK";
// 要转入的OPS数量，如果没有请填入0，如转入200个OPS，则填入20000000000，此处填入的值要乘以10的8次幂，如200个OPS，则`value = 200 * (10 ^ 8)`
let opsAmount = 0;
// 资产链ID
let assetChainId = 2;
// 资产ID
let assetId = 1;
// 交易备注
let remark = 'call contract...';

let contractCall = {
    chainId: assetChainId,
    sender: fromAddress,
    contractAddress: busContractAddress,
    value: opsAmount, //
    methodName: "approve",
    methodDesc: "",
    args: ["tOPSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG", 20000000]
};
//调用合约
call.callContract(pri, pub, fromAddress, assetChainId, assetId, contractCall, remark);
