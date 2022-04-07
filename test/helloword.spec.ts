/* eslint-disable node/no-missing-import */
import { expect } from "chai";
import { ethers } from "hardhat";
import { HelloWorld } from "../typechain";

describe("HelloWorld", () => {
  let helloWorld: HelloWorld;
  const setup = async () => {
    const factory = await ethers.getContractFactory("HelloWorld");
    helloWorld = (await factory.deploy()) as HelloWorld;
  };

  before(setup);

  it("state before", async () => {
    expect(await helloWorld.retrieveNumber()).to.equal(0);
  });

  it("able to modify state", async () => {
    const state = 1234;
    const tx = await helloWorld.storedNumber(state);
    await tx.wait();

    expect(await helloWorld.retrieveNumber()).to.equal(state);
  });
});
