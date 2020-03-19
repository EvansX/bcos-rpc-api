const express = require('express');
const router = express.Router();
const common = require('../utils/common');
const logger = require('../log/logger').logerMiddleware;

router.get('/getTransactionByHash/:groupID/:transactionHash',logger, async (req, res, next) => {
  common.rpcMethodHandle(req, res, next, "getTransactionByHash", {
    groupID: { name: "groupID", idx: 0 },
    transactionHash: { name: "transactionHash", idx: 1 }
  });
});

router.get('/getTransactionReceipt/:groupID/:transactionHash',logger, async (req, res, next) => {
  common.rpcMethodHandle(req, res, next, "getTransactionReceipt", {
    groupID: { name: "groupID", idx: 0 },
    transactionHash: { name: "transactionHash", idx: 1 }
  });
});

router.get('/getPendingTransactions/:groupID',logger, async (req, res, next) => {
  common.rpcMethodHandle(req, res, next, "getPendingTransactions", {
    groupID: { name: "groupID", idx: 0 }
  });
});

router.get('/getTotalTransactionCount/:groupID',logger, async (req, res, next) => {
  common.rpcMethodHandle(req, res, next, "getTotalTransactionCount", {
    groupID: { name: "groupID", idx: 0 }
  });
});

module.exports = router;
