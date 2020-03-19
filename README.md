# 需要用的的RPC接口

## block
### getBlockNumber-返回节点指定群组内的最新区块高度
#### 1、参数
+ groupID: unsigned int - 群组ID
+ blockNumber: string - 区块高度(十进制字符串或0x开头的十六进制字符串)
+ includeTransactions: bool - 包含交易标志(true显示交易详细信息，false仅显示交易的hash)
#### 2、示例
```
curl -X POST --data '{"jsonrpc":"2.0","method":"getBlockNumber","params":[1],"id":1}' http://127.0.0.1:8545 |jq
```

### getBlockByHash-返回根据区块哈希查询的区块信息
#### 1、参数
+ groupID: unsigned int - 群组ID
+ blockHash: string - 区块哈希
+ includeTransactions: bool - 包含交易标志(true显示交易详细信息，false仅显示交易的hash)
#### 2、示例
```
curl -X POST --data '{"jsonrpc":"2.0","method":"getBlockByHash","params":[1,"0x910ea44e2a83618c7cc98456678c9984d94977625e224939b24b3c904794b5ec",true],"id":1}' http://127.0.0.1:8545 |jq
```

### getBlockHashByNumber-返回根据区块高度查询的区块哈希
#### 1、参数
+ groupID: unsigned int - 群组ID
+ blockNumber: string - 区块高度(十进制字符串或0x开头的十六进制字符串)
#### 2、示例
```
curl -X POST --data '{"jsonrpc":"2.0","method":"getBlockHashByNumber","params":[1,"0x1"],"id":1}' http://127.0.0.1:8545 |jq
```



## transaction
### getTransactionByHash-返回根据交易哈希查询的交易信息
#### 1、参数
+ groupID: unsigned int - 群组ID
+ transactionHash: string - 交易哈希
#### 2、示例
```
 curl -X POST --data '{"jsonrpc":"2.0","method":"getTransactionByHash","params":[1,"0x7536cf1286b5ce6c110cd4fea5c891467884240c9af366d678eb4191e1c31c6f"],"id":1}' http://127.0.0.1:8545 |jq
```


### getTransactionReceipt-返回根据交易哈希查询的交易回执信息
#### 1、参数
+ groupID: unsigned int - 群组ID
+ transactionHash: string - 交易哈希
#### 2、示例
```
curl -X POST --data '{"jsonrpc":"2.0","method":"getTransactionReceipt","params":[1,"0x708b5781b62166bd86e543217be6cd954fd815fd192b9a124ee9327580df8f3f"],"id":1}' http://127.0.0.1:8545 |jq
```

### getPendingTransactions-返回待打包的交易信息
#### 1、参数
+ groupID: unsigned int - 群组ID
#### 2、示例
```
curl -X POST --data '{"jsonrpc":"2.0","method":"getPendingTransactions","params":[1],"id":1}' http://127.0.0.1:8545 |jq
```

### getTotalTransactionCount-返回当前交易总数和区块高度
#### 1、参数
+ groupID: unsigned int - 群组ID
#### 2、示例
```
curl -X POST --data '{"jsonrpc":"2.0","method":"getTotalTransactionCount","params":[1],"id":1}' http://127.0.0.1:8545 |jq
```

## contract
### getCode-返回根据合约地址查询的合约数据
#### 1、参数
+ groupID: unsigned int - 群组ID
+ address: string - 合约地址
#### 2、示例
```
curl -X POST --data '{"jsonrpc":"2.0","method":"getCode","params":[1,"0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b"],"id":1}' http://127.0.0.1:8545 |jq
```

## node
### getNodeIDList-返回节点本身和已连接的p2p节点列表
#### 1、参数
+ groupID: unsigned int - 群组ID
#### 2、示例
```
curl -X POST --data '{"jsonrpc":"2.0","method":"getNodeIDList","params":[1],"id":1}' http://127.0.0.1:8545 |jq
```

### getSealerList-返回指定群组内的共识节点列表
#### 1、参数
+ groupID: unsigned int - 群组ID
#### 2、示例
```
curl -X POST --data '{"jsonrpc":"2.0","method":"getSealerList","params":[1],"id":1}' http://127.0.0.1:8545 |jq
```

### getObserverList-返回指定群组内的观察节点列表
#### 1、参数
+ groupID: unsigned int - 群组ID
#### 2、示例
```
curl -X POST --data '{"jsonrpc":"2.0","method":"getObserverList","params":[1],"id":1}' http://127.0.0.1:8545 |jq
```

## group
### getGroupList-返回节点所属群组的群组ID列表
#### 1、参数
+ 无
#### 2、示例
```
curl -X POST --data '{"jsonrpc":"2.0","method":"getGroupList","params":[],"id":1}' http://127.0.0.1:8545 |jq
```

### getGroupPeers-返回指定群组内的共识节点和观察节点列表
#### 1、参数
+ groupID: unsigned int - 群组ID
#### 2、示例
```
curl -X POST --data '{"jsonrpc":"2.0","method":"getGroupPeers","params":[1],"id":1}' http://127.0.0.1:8545 |jq
```

### getConsensusStatus-返回指定群组内的共识状态信息
#### 1、参数
+ groupID: unsigned int - 群组ID
#### 2、示例
```
curl -X POST --data '{"jsonrpc":"2.0","method":"getConsensusStatus","params":[1],"id":1}' http://127.0.0.1:8545 |jq
```

### getPbftView-返回节点所在指定群组内的最新PBFT视图
#### 1、参数
+ groupID: unsigned int - 群组ID
#### 2、示例
```
curl -X POST --data '{"jsonrpc":"2.0","method":"getPbftView","params":[1],"id":1}' http://127.0.0.1:8545 |jq
```
