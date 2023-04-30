import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
import "@nomiclabs/hardhat-etherscan";
// import '@nomiclabs/hardhat-waffle';
import "@typechain/hardhat";
import "solidity-coverage";
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";

dotenv.config();

function getEnvVariable(name: string, optional = false) {
  if (!optional && !process.env[name]) {
    throw new Error(`Please set your ${name} in an .env file`);
  }
  return process.env[name] ?? "";
}

const privateKey = (() => {
  const key = getEnvVariable("PRIVATE_KEY");
  if (!key.startsWith("0x")) {
    throw new Error('PRIVATE_KEY has to start with "0x"');
  }
  return key;
})();

const accounts = [privateKey];

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  etherscan: {
    apiKey: {
      bscTestnet: getEnvVariable("API_KEY_BSCSCAN"),
    },
  },
  networks: {
    bsc: {
      chainId: 56,
      url: "https://bsc-dataseed.binance.org",
      accounts,
      verify: {
        etherscan: {
          apiKey: getEnvVariable("API_KEY_BSCSCAN"),
        },
      },
    },
    bscTestnet: {
      chainId: 97,
      url: "https://data-seed-prebsc-1-s3.binance.org:8545",
      accounts,
      verify: {
        etherscan: {
          apiKey: getEnvVariable("API_KEY_BSCSCAN"),
        },
      },
    },
  },
  namedAccounts: {
    deployer: 0,
    owner: {
      bsc: "0x5E6Fc266E098C241B1a1c5c41b026ADCf66EdE93",
      bscTestnet: "0x5E6Fc266E098C241B1a1c5c41b026ADCf66EdE93",
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
};
export default config;
