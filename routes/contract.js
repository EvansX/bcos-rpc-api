const express = require('express');
const router = express.Router();
const common = require('../utils/common');
const logger = require('../log/logger').logerMiddleware;

router.get('/getCode/:groupID/:address',logger, async (req, res, next) => {
  common.rpcMethodHandle(req, res, next, "getCode", {
    groupID: { name: "groupID", idx: 0 },
    address: { name: "address", idx: 1 },
  });
})


module.exports = router;
