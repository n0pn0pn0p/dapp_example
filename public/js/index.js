
// 引入依赖模块

// var Web3 = require("web3")


// var web3;
// // 创建web3对象并连接到以太坊节点
// if (typeof web3 !== 'undefined') {
//   web3 = new Web3(web3.currentProvider);
// } else {
//   // set the provider you want from Web3.providers
//   web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// }


// abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
// var VotingContract = web3.eth.contract(abi);
// // In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
// var contractInstance = VotingContract.at('0x36e229000d0f2087cdda1ba59c714c9b2d25edab');
// var candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

// function voteForCandidate() {
//   candidateName = $("#candidate").val();
//   contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0]}, function() {
//     let div_id = candidates[candidateName];
//     $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
//   });
// }

// $(document).ready(function() {
//   var candidateNames = Object.keys(candidates);
//   for (var i = 0; i < candidateNames.length; i++) {
//     let name = candidateNames[i];
//     let val = contractInstance.totalVotesFor.call(name).toString()
//     $("#" + candidates[name]).html(val);
//   }
// });

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"voteAddr","type":"address"},{"name":"voteName","type":"bytes32"}],"name":"getVoteRight","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"voters","outputs":[{"name":"name","type":"bytes32"},{"name":"voted","type":"bool"},{"name":"vote","type":"bytes32"},{"name":"votetime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0x12ccc17794e49be4296379ba3aebc6f194c41409');
candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"};

function getVoteRight(){
 
  voteAddress = $("#voteAddr").val(); 
  web3.eth.defaultAccount = voteAddress;
  voteName = "'" + $("#voteName").val() + "'";
  console.log(voteName);
  console.log(voteAddress);
  contractInstance.getVoteRight(voteAddress,voteName,{from:voteAddress, gas:1000000});
}
function voteForCandidate() {
    
  candidateName = $("#candidate").val();
  contractInstance.voteForCandidate(candidateName, {from: voteAddress,gas:1000000}, function() {
    let div_id = candidates[candidateName];
    $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
  });
}

$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.totalVotesFor.call(name).toString()
    $("#" + candidates[name]).html(val);
  }
});
