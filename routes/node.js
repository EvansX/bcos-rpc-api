const express = require('express');
const router = express.Router();
const common = require('../utils/common');
const logger = require('../log/logger')
const logerMiddleware =logger.logerMiddleware;

router.get('/getNodeIDList/:groupID', async (req, res, next) => {
  common.rpcMethodHandle(req, res, next, "getNodeIDList", { groupID: { name: "groupID", idx: 0 } });
});

router.get('/getPeers/:groupID', logerMiddleware, (req, res, next) => {
  common.rpcMethodHandle(req, res, next, "getPeers", { groupID: { name: "groupID", idx: 0 } });
});

router.get('/getSealerList/:groupID', logerMiddleware, (req, res, next) => {
  common.rpcMethodHandle(req, res, next, "getSealerList", { groupID: { name: "groupID", idx: 0 } });
});

router.get('/getObserverList/:groupID', logerMiddleware, (req, res, next) => {
  common.rpcMethodHandle(req, res, next, "getObserverList", { groupID: { name: "groupID", idx: 0 } });
});


module.exports = router;
