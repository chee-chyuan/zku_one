/* eslint-disable node/no-missing-import */
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers, network } from "hardhat";
import { Ballot } from "../typechain";

describe("Test ballot", () => {
  const proposalName = "Test proposal";
  const proposalNumber = 0;
  const timeLimit = 10 * 60; // 10 minutes in seconds
  let ballot: Ballot;
  let deployedTimestamp: number;
  let chairperson: SignerWithAddress,
    voter1: SignerWithAddress,
    voter2: SignerWithAddress;

  const getCurrentTimestamp = async () => {
    const blockNumber = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumber);
    return blockBefore.timestamp;
  };

  const incrementBlocktime = async function incrementBlocktime(
    seconds: number
  ): Promise<void> {
    await network.provider.send("evm_increaseTime", [seconds]);
    await ethers.provider.send("evm_mine", []);
  };

  const setup = async () => {
    [chairperson, voter1, voter2] = await ethers.getSigners();

    const factory = await ethers.getContractFactory("Ballot");
    ballot = (await factory.deploy([
      ethers.utils.formatBytes32String(proposalName),
    ])) as Ballot;
    await ballot.deployed();

    deployedTimestamp = await getCurrentTimestamp();

    // giveRightToVote
    let tx = await ballot.connect(chairperson).giveRightToVote(voter1.address);
    await tx.wait();

    tx = await ballot.connect(chairperson).giveRightToVote(voter2.address);
    await tx.wait();
  };

  before(setup);

  it("check deployed time is correct", async () => {
    expect(await ballot.startTime()).to.equal(deployedTimestamp);
  });

  it("able to vote before time limit", async () => {
    // check that time has not exceed time limit
    expect(await getCurrentTimestamp()).to.lessThan(
      deployedTimestamp + timeLimit
    );

    // proposal state before
    expect((await ballot.proposals(proposalNumber)).voteCount).to.equal(0);

    const voteTx = await ballot.connect(voter1).vote(proposalNumber);
    await voteTx.wait();

    // proposal state before
    expect((await ballot.proposals(proposalNumber)).voteCount).to.equal(1);
  });

  it("not able to vote after time limit", async () => {
    const currentTimeStamp = await getCurrentTimestamp();
    const interval = deployedTimestamp + timeLimit - currentTimeStamp + 1;
    await incrementBlocktime(interval);

    // check if time has exceeded the time limit
    expect(await getCurrentTimestamp()).to.greaterThan(
      deployedTimestamp + timeLimit
    );

    const promise = ballot.connect(voter2).vote(proposalNumber);
    await expect(promise).to.revertedWith("Ballot__VoteEnded");

    // proposal state unchanged
    expect((await ballot.proposals(proposalNumber)).voteCount).to.equal(1);
  });
});
