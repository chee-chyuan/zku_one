/* eslint-disable node/no-missing-import */
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import params from "./constructorArgument/ballot_arguments";

async function main() {
  const factory = await ethers.getContractFactory("Ballot");
  const ballot = await factory.deploy(params[0]);

  await ballot.deployed();

  console.log("Ballot deployed to:", ballot.address);
  // console.log("Done");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
