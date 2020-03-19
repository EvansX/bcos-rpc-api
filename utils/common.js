let common = {};
const http = require('http');
const Joi = require('@hapi/joi');
const env = "test"

common.httpPost = (post_data, options) => {
  let content = JSON.stringify(post_data);
  return new Promise((resolve, reject) => {
    let req = http.request(options, function (res) {
      let revicedata = "";
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        revicedata += chunk;
      });
      res.on('end', function () {
        resolve(revicedata);
      });
    });
    req.on('error', function (e) {
      console.log('problem with httpPost request: ' + e.message);
      reject()
    });
    // write data to request body
    req.write(content);
    req.end();
  });

}
common.createReturnBody = function (code = 0, message = "success") {
  return { code, message }
}

common.getDataByMethod = async function (method, params) {
  let options = {
    hostname: env == 'production' ? '127.0.0.1' : '192.168.25.159',
    port: 8545,
    path: env == 'production' ? 'http://127.0.0.1:8545' : 'http://192.168.25.159:8545',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  };
  let post_data = {
    jsonrpc: "2.0",
    method: method,
    params,
    id: 1
  };
  let data = await common.httpPost(post_data, options);
  return JSON.parse(data).result || null;
}

common.rpcMethodHandle = async function (req, res, next, method, params) {
  // logger(req,res,next);
  let returnBody = common.createReturnBody();
  try {
    //param names: groupID,blockNumber,blockHash,includeTransactions,address,transactionHash
    let obj = {};
    if (params.groupID)
      obj[params.groupID.name] = Joi.number().integer().min(1).required();
    if (params.blockNumber)
      obj[params.blockNumber.name] = Joi.number().integer().min(1).required();
    if (params.blockHash)
      obj[params.blockHash.name] = Joi.string().alphanum().required();
    if (params.includeTransactions)
      obj[params.includeTransactions.name] = Joi.boolean().default(true).required();
    if (params.address)
      obj[params.address.name] = Joi.string().alphanum().required();
    if (params.transactionHash)
      obj[params.transactionHash.name] = Joi.string().alphanum().required();

    const schema = Joi.object(obj);
    let valiResult = schema.validate(req.params);
    if (valiResult.error)
      return next({ code: 1001, message: valiResult.error.details[0].message });
    let paramsArr = []
    for (let key of Object.keys(valiResult.value)) {
      paramsArr[params[key].idx] = valiResult.value[params[key].name];
      if (params[key].name == "blockNumber")
        paramsArr[params[key].idx] = '0x' + valiResult.value[params[key].name].toString(16);
    }
    returnBody.data = await common.getDataByMethod(method, paramsArr);
    res.json(returnBody);
  } catch (error) {
    next({ code: 500, message: error.message });
  }
}

common.getClientIp = (req) => {
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress;
};


common.ErrorCode = {
  30010: "自定义错误"
}




module.exports = common;