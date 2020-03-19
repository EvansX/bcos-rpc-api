const express = require('express');
const router = express.Router();
const common = require('../utils/common');
const logger = require('../log/logger').logerMiddleware;

router.get('/getBlockByNumber/:groupID/:blockNumber/:includeTransactions',logger, async (req, res, next) => {
  common.rpcMethodHandle(req, res, next, "getBlockByNumber", {
    groupID: { name: "groupID", idx: 0 },
    blockNumber: { name: "blockNumber", idx: 1 },
    includeTransactions: { name: "includeTransactions", idx: 2 }
  });
});

router.get('/getBlockNumber/:groupID', logger,async (req, res, next) => {
  common.rpcMethodHandle(req, res, next, "getBlockNumber", {
    groupID: { name: "groupID", idx: 0 }
  });
});

router.get('/getBlockByHash/:groupID/:blockHash/:includeTransactions', logger,async (req, res, next) => {
  common.rpcMethodHandle(req, res, next, "getBlockByHash", {
    groupID: { name: "groupID", idx: 0 },
    blockHash: { name: "blockHash", idx: 1 },
    includeTransactions: { name: "includeTransactions", idx: 2 },
  });
});

router.get('/getBlockHashByNumber/:groupID/:blockNumber', logger,async (req, res, next) => {
  common.rpcMethodHandle(req, res, next, "getBlockHashByNumber", {
    groupID: { name: "groupID", idx: 0 },
    blockNumber: { name: "blockNumber", idx: 1 },
  });
});

module.exports = router;
