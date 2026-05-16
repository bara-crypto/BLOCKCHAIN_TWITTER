
/*
import { ethers } from 'hardhat';

const main = async () => {

  const profileImageFactory = await ethers.getContractFactory('ProfileImageNfts',)
  const profileImageContract = await profileImageFactory.deploy()
  await profileImageContract.deployed()

  console.log('Profile Image Minter deployed to:', profileImageContract.address)
}

;(async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()

*/

import hre from "hardhat";

async function main() {
  console.log("Preparing deployment...");

  // 1. Get the Contract Factory
  const ProfileImageFactory = await hre.ethers.getContractFactory("ProfileImageNfts");

  // 2. Start deployment
  console.log("Deploying ProfileImageNfts contract...");
  const profileImageContract = await ProfileImageFactory.deploy();

  // 3. Wait for the deployment to be mined (Ethers v6 syntax)
  await profileImageContract.waitForDeployment();

  // 4. Get the deployed contract address
  const contractAddress = await profileImageContract.getAddress();

  console.log("-----------------------------------------");
  console.log(`✅ Success! Profile Image Minter deployed to: ${contractAddress}`);
  console.log("-----------------------------------------");
}

// Standard Hardhat pattern for running async scripts
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});