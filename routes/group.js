const express = require('express');
const router = express.Router();
const common = require('../utils/common');
const logger = require('../log/logger').logerMiddleware;

router.get('/getGroupList',logger, (req, res, next) => {
  common.rpcMethodHandle(req, res, next, "getGroupList", {});
});

router.get('/getGroupPeers/:groupID',logger, (req, res, next) => {
  common.rpcMethodHandle(req, res, next, "getGroupPeers", { groupID: { name: "groupID", idx: 0 } });
});

router.get('/getConsensusStatus/:groupID',logger, (req, res, next) => {
  common.rpcMethodHandle(req, res, next, "getConsensusStatus", { groupID: { name: "groupID", idx: 0 } });
});

module.exports = router;
