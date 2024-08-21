const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");
const { ethers } = require("hardhat");
const { getJson } = require("../json.js");

var fs = require("fs");

function mockData() {
  return Object.entries(getJson("./test/merkle/data1000.json")).map((item) => {
    return [item[0], item[1]];
  });
}

function mockNewNFTData1() {
  return Object.entries(getJson("./test/merkle/datanft1.json")).map((item) => {
    return [item[0], item[1]];
  });
}

function mockNewNFTData2() {
  return Object.entries(getJson("./test/merkle/datanft2.json")).map((item) => {
    return [item[0], item[1]];
  });
}

function mockNewNFTData3() {
  return Object.entries(getJson("./test/merkle/datanft3.json")).map((item) => {
    return [item[0], item[1]];
  });
}

function mock500Data() {
  return Object.entries(getJson("./test/merkle/data500.json")).map((item) => {
    return [item[0], item[1]];
  });
}

function mockVIPData() {
  return Object.entries(getJson("./test/merkle/data_vip.json")).map((item) => {
    return [item[0], item[1]];
  });
}

function output(data, tree, leaves, lpid, num, vip) {
  let list = new Array();
  // let rs = new Array()
  for (i = 0; i < data.length; i++) {
    list.push({
      lpid: lpid,
      lp_index: data[i][1],
      num: num,
      calldata: data[i][0],
      proof: tree.getHexProof(leaves[i]),
    });
  }
  fs.writeFileSync(vip + "rs0" + "-" + data.length, JSON.stringify(list));
  return list;
}

async function makeMerkle(data, lpid, num, userAddress) {
  console.log("loaddata start");
  if (!data) data = mockData();
  // console.log(data)
  console.log("loaddata");
  // merkle tree
  const leaves = data.map((item, _) => {
    // userAddress = "0x"+item[0].substring(34,74);
    console.log("item", lpid, item[1], num, item[0], userAddress);
    return ethers.utils.solidityKeccak256(
      ["uint256", "uint256", "uint256", "bytes", "address"],
      [lpid, item[1], num, item[0], userAddress]
    );
  });
  console.log("load leaves:", leaves);
  const tree = new MerkleTree(leaves, keccak256, { sort: true });
  const root = tree.getHexRoot();
  // console.log(root)
  const rs = output(data, tree, leaves, lpid, num, "user-");
  // console.log(rs)
  return { root: root, rs: JSON.stringify(rs) };
}

async function makeNewNFTMerkle(data, lpid, num) {
  console.log("loaddata start");
  console.log(data)
  // merkle tree
  const leaves = data.map((item, _) => {
    let userAddress = "0x"+item[0].substring(34,74);
    console.log("item", lpid, item[1], num, item[0], userAddress);
    return ethers.utils.solidityKeccak256(
      ["uint256", "uint256", "uint256", "bytes", "address"],
      [lpid, item[1], num, item[0], userAddress]
    );
  });
  console.log("load leaves:", leaves);
  const tree = new MerkleTree(leaves, keccak256, { sort: true });
  const root = tree.getHexRoot();
  // console.log(root)
  const rs = output(data, tree, leaves, lpid, num, "newnft"+lpid+"-user-");
  // console.log(rs)
  return { root: root, rs: JSON.stringify(rs) };
}



async function makeVIPMerkle(data, lpid, num, userAddress) {
  // console.log("loaddata start")
  if (!data) data = mockVIPData();
  // console.log(data)
  console.log("loaddata vip");
  // merkle tree
  const leaves = data.map((item, _) => {
    // userAddress = "0x"+item[0].substring(34,74);
    return ethers.utils.solidityKeccak256(
      ["uint256", "uint256", "uint256", "bytes", "address"],
      [lpid, item[1], num, item[0], userAddress]
    );
  });
  console.log("load leaves:", leaves);
  const tree = new MerkleTree(leaves, keccak256, { sort: true });
  const root = tree.getHexRoot();
  // console.log(root)
  const rs = output(data, tree, leaves, lpid, num, "vip-");
  // console.log(rs)
  return { vipRoot: root, vipRs: JSON.stringify(rs) };
}

module.exports = {
  mockData,
  makeMerkle,
  mockVIPData,
  makeVIPMerkle,
  mock500Data,
  makeNewNFTMerkle,
  mockNewNFTData1,
  mockNewNFTData2,
  mockNewNFTData3
};
