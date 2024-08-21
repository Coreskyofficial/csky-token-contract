const { expect, assert } = require("chai");
const { BigNumber, utils } = require("ethers");
const fs = require("fs");
const chai = require("chai");
const hre = require("hardhat");
const { MerkleTree } = require("merkletreejs");
const {
  solidityPack,
  concat,
  toUtf8Bytes,
  keccak256,
  SigningKey,
  formatBytes32String,
} = utils;

describe("CoreskyToken-test", function () {
  let accounts;
  let airdrops;
  let leaves;
  let tree;
  // 5.创建ERC20合约
  let erc20TransferProxy;
  let erc20token;

  async function signer() {
    const [admin, operator, bob, sam, user] = await ethers.getSigners();
    return { admin, operator, bob, sam, user };
  }

  before(async function () {
    accounts = await ethers.getSigners();
    console.log("account0       depolyer:", accounts[0].address);
    console.log("account1          miner1:", accounts[1].address);
    console.log("account2          miner2:", accounts[2].address);
    console.log("account3          miner3:", accounts[3].address);
    console.log("account4          miner4:", accounts[4].address);
  });

  it("deploy", async function () {
    const {admin, operator, bob, sam, user} = await signer();
    const CoreskyToken = await ethers.getContractFactory("CoreskyToken");
    erc20token = await CoreskyToken.deploy(operator.address);
    await erc20token.deployed();
    console.log("CoreskyToken deployed to:", erc20token.address);
    console.log("CoreskyToken totalSupply:", (await erc20token.totalSupply()).toString());
    console.log("CoreskyToken cap:", (await erc20token.cap()).toString());
  });

  it("mint-【caller is not the owner】", async function () {
    const {admin, operator, bob, sam, user} = await signer();
   
    // function mint(address to, uint256 amount) external onlyOwner ;
    let tx = erc20token.mint(bob.address, m(50000000));
    await (0, chai.expect)(tx).to.be.revertedWithCustomError(erc20token, `OwnableUnauthorizedAccount`, admin.address);
  });

  it("mint-bob", async function () {
    const {admin, operator, bob, sam, user} = await signer();
   
    // function mint(address to, uint256 amount) external onlyOwner ;
    await erc20token.connect(operator).mint(bob.address, m(50000000));
    console.log("bob balanceOf", (await erc20token.balanceOf(bob.address)).toString());
    console.log("CoreskyToken totalSupply:", (await erc20token.totalSupply()).toString());

  });

  it("mint-sam", async function () {
    const {admin, operator, bob, sam, user} = await signer();
   
    // function mint(address to, uint256 amount) external onlyOwner ;
    await erc20token.connect(operator).mint(sam.address, m(150000000));
    console.log("sam balanceOf", (await erc20token.balanceOf(sam.address)).toString());
    console.log("CoreskyToken totalSupply:", (await erc20token.totalSupply()).toString());

  });

  it("mint-user", async function () {
    const {admin, operator, bob, sam, user} = await signer();
   
    // function mint(address to, uint256 amount) external onlyOwner ;
    await erc20token.connect(operator).mint(user.address, m(800000000));
    console.log("user balanceOf", (await erc20token.balanceOf(user.address)).toString());
    console.log("CoreskyToken totalSupply:", (await erc20token.totalSupply()).toString());

  });

  it("mint-user-【cap exceeded】", async function () {
    const {admin, operator, bob, sam, user} = await signer();
   
    // function mint(address to, uint256 amount) external onlyOwner ;
    let tx = erc20token.connect(operator).mint(user.address, "1");
    await (0, chai.expect)(tx).to.be.revertedWithCustomError(erc20token, "ERC20ExceededCap", "1000000000000000000000000001", "1000000000000000000000000000");

  });


  function getAbi(jsonPath) {
    let file = fs.readFileSync(jsonPath);
    let abi = JSON.parse(file.toString()).abi;
    return abi;
  }

  function m(num) {
    return BigNumber.from("1000000000000000000").mul(num);
  }

  function d(bn) {
    return bn.div("1000000000000000").toNumber() / 1000;
  }

  function b(num) {
    return BigNumber.from(num);
  }

  function n(bn) {
    return bn.toNumber();
  }

  function s(bn) {
    return bn.toString();
  }
});
