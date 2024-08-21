/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");

require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-web3");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
// require("hardhat-docgen");
require("xdeployer");

require("dotenv").config();

const { ProxyAgent, setGlobalDispatcher } = require("undici");
const proxyAgent = new ProxyAgent("http://127.0.0.1:15236");
setGlobalDispatcher(proxyAgent);
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const optimizerSettingsNoSpecializer = {
  enabled: true,
  runs: 4294967295,
  details: {
      peephole: true,
      inliner: true,
      jumpdestRemover: true,
      orderLiterals: true,
      deduplicate: true,
      cse: true,
      constantOptimizer: true,
      yulDetails: {
          stackAllocation: true,
          optimizerSteps: "dhfoDgvulfnTUtnIf[xa[r]EscLMcCTUtTOntnfDIulLculVcul [j]Tpeulxa[rul]xa[r]cLgvifCTUca[r]LSsTOtfDnca[r]Iulc]jmul[jul] VcTOcul jmul",
      },
  },
};

const {
  ALCHEMY_API_KEY,
  INFURA_API_KEY,
  GOERLI_PRIVATE_KEY1,
  GOERLI_PRIVATE_KEY2,
  ETHERSCAN_API_KEY,
  BSCSCAN_API_KEY,
  ETH_PK_2,
  ETH_PK_3,
  ETH_PK_4,
  POLYGON_MUMBAISCAN_API_KEY
} = process.env;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      gas: 30000000,
    },
    localhost: {
      allowUnlimitedContractSize: true,
      gas: 30000000,
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [
        GOERLI_PRIVATE_KEY1,
        GOERLI_PRIVATE_KEY2,
        ETH_PK_2,
        ETH_PK_3,
        ETH_PK_4,
      ],
      gasMultiplier: 1.3,
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [
        GOERLI_PRIVATE_KEY1,
        GOERLI_PRIVATE_KEY2,
        ETH_PK_2,
        ETH_PK_3,
        ETH_PK_4,
      ],
      gasMultiplier: 1.3,
    },
    bsctest: {
        url: `https://bsc-testnet.nodereal.io/v1/e9a36765eb8a40b9bd12e680a1fd2bc5`,
        accounts: [
          GOERLI_PRIVATE_KEY1,
          GOERLI_PRIVATE_KEY2,
          ETH_PK_2,
          ETH_PK_3,
          ETH_PK_4,],
        chainId: 97,
    },
    polygon_test: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [
        GOERLI_PRIVATE_KEY1,
        GOERLI_PRIVATE_KEY2,
        ETH_PK_2,
        ETH_PK_3,
        ETH_PK_4,
      ],
      chainId: 80001,
    },
    polygon_main: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/7FQivSnx5ggzRiJ3YOC20_5mVr_YtmeZ`,
      accounts: [
        GOERLI_PRIVATE_KEY1,
        GOERLI_PRIVATE_KEY2,
        ETH_PK_2,
        ETH_PK_3,
        ETH_PK_4,
      ],
      chainId: 137,
    },
    oort_main: {
      url: `https://mainnet-rpc.oortech.com/`,
      accounts: [
        GOERLI_PRIVATE_KEY1,
        GOERLI_PRIVATE_KEY2,
        ETH_PK_2,
        ETH_PK_3,
        ETH_PK_4,
      ],
      chainId: 970,
    },
    oort_dev: {
      url: `https://dev-rpc.oortech.com/`,
      accounts: [
        GOERLI_PRIVATE_KEY1,
        GOERLI_PRIVATE_KEY2,
        ETH_PK_2,
        ETH_PK_3,
        ETH_PK_4,
      ],
      chainId: 9700,
      gas: 30000000,
    },
    oort_huygens: {
      url: `https://huygens-rpc.oortech.com/`,
      accounts: [
        GOERLI_PRIVATE_KEY1,
        GOERLI_PRIVATE_KEY2,
        ETH_PK_2,
        ETH_PK_3,
        ETH_PK_4,
      ],
      chainId: 971,
    },
    oort_ascraeus: {
      url: `https://ascraeus-rpc.oortech.com/`,
      accounts: [
        GOERLI_PRIVATE_KEY1,
        GOERLI_PRIVATE_KEY2,
        ETH_PK_2,
        ETH_PK_3,
        ETH_PK_4,
      ],
      chainId: 972,
    },
  },
  etherscan: {
    apiKey: {
      polygon: POLYGON_MUMBAISCAN_API_KEY,
      polygonMumbai: POLYGON_MUMBAISCAN_API_KEY,
      goerli: ETHERSCAN_API_KEY,
      sepolia: ETHERSCAN_API_KEY,
      bscTestnet: BSCSCAN_API_KEY
    },
  },
  docgen: {
    path: "./documents",
    clear: true,
    runOnCompile: true,
  },
  solidity: {
    compilers: [
      {
        version: "0.4.19",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.4.26",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.23",
        settings: {
          viaIR: true,
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      // {
      //   version: "0.8.25", // any version you want
      //   settings: {
      //     viaIR: true,
      //     optimizer: {
      //       enabled: false,
      //       runs: 200,
      //       // details: {
      //       //   yulDetails: {
      //       //     optimizerSteps: "u",
      //       //   },
      //       // },
      //     },
      //   },
      // },
      // {
      //   version: "0.8.19",
      //   settings: {
      //     viaIR: true,
      //     optimizer: {
      //       enabled: true,
      //       runs: 200,
      //     },
      //   },
      // },
    ],
    overrides: {
      // "contracts/CoreskyToken.sol": {
      //     version: "0.8.23",
      //     settings: {
      //         viaIR: true,
      //         optimizer: {
      //             enabled: true,
      //             runs: 200,
      //         },
      //     },
      // }
    },
  },
};
