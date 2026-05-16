require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.20", // Recommended: highest version for modern OZ
      },
      {
        version: "0.8.2",  // Required for your MintProfileImage.sol
      }
    ],
  },
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/Llr5D7X4yi0XOaShV6L3I",
      accounts: ["8e70670ceb2b44a89892dde12867b24181778aae550c5a2d2aaaac6fcc2fa8d1"],
      chainId: 11155111,
    },
    worldchain: {
      url: "https://worldchain-sepolia.g.alchemy.com/v2/Llr5D7X4yi0XOaShV6L3I",
      accounts: ["8e70670ceb2b44a89892dde12867b24181778aae550c5a2d2aaaac6fcc2fa8d1"],
      chainId: 4801,
    },
  },

  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt"
  }
};


// import "@nomicfoundation/hardhat-toolbox";

// /** @type import('hardhat/config').HardhatUserConfig */


// export const solidity = "0.8.2";
// export const networks = {
//   sepolia: {
//     url: "https://eth-sepolia.g.alchemy.com/v2/Llr5D7X4yi0XOaShV6L3I",
//     accounts: ["8e70670ceb2b44a89892dde12867b24181778aae550c5a2d2aaaac6fcc2fa8d1"],
//     chainId: 11155111,
//   },
//   worldchain: {
//     url: "https://worldchain-sepolia.g.alchemy.com/v2/Llr5D7X4yi0XOaShV6L3I",
//     accounts: ["8e70670ceb2b44a89892dde12867b24181778aae550c5a2d2aaaac6fcc2fa8d1"],
//     chainId: 4801,
//   },
//   hardhat: {
//     chainId: 1337,
//   },
// };


