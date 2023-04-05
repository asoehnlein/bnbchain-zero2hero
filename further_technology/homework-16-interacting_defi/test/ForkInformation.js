const { expect } = require("chai");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");


async function initializePancakeFixture() {

  const PancakeFactory = await ethers.getContractFactory("PancakeFactory");
  const pancakeFactory = await PancakeFactory.attach(
    "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73" // The deployed contract address of Pancake Factory
  );

  const PancakePair = await ethers.getContractFactory("PancakePair");
  const pancakePair = await PancakePair.attach(
    "0xb95817627a289EDB10C4fe6a126f41665Eb6B8B9" // The deployed contract address of Pancake Pair LEGO-BUSD
  );

  const LegoContract = await ethers.getContractFactory("LEGOToken");
  const legoContract = await LegoContract.attach(
    "0x520EbCcc63E4d0804b35Cda25978BEb7159bF0CC" // The deployed contract address of LEGOToken
  );

  return { pancakeFactory, pancakePair, legoContract };
}

describe("Fork Information:", function () {
  it("Should show current blocknumber", async function () {

    const block = (await ethers.provider.getBlock("latest"));
    console.log("\tBlock: ",block.number);
  });
  it("Should show current block timestamp", async function () {

    const timeStamp = (await ethers.provider.getBlock("latest")).timestamp;
    console.log("\tBlock timestamp: ",timeStamp);
  });
  it("Should show current chainID", async function () {

    const chainIdHex = await network.provider.send('eth_chainId');
    console.log("\tChainID: ",parseInt(chainIdHex));
  });
  it("Should show Pancake Factory", async function () {

    const { pancakeFactory } = await loadFixture(initializePancakeFixture);
    console.log("\tPancakeFactory address: ",pancakeFactory.address);
  });
  it("Should show Pancake LEGO-BUSD pair", async function () {

    const { pancakePair } = await loadFixture(initializePancakeFixture);
    console.log("\tPancakePair address: ",pancakePair.address);
  });
  it("Should query Pancake LEGO-BUSD pair reserves", async function () {

    const { pancakePair } = await loadFixture(initializePancakeFixture);
    const reserves = await pancakePair.getReserves();
    console.log("\tPancakePair reserve0: ",parseInt(reserves._reserve0));
    console.log("\tPancakePair reserve1: ",parseInt(reserves._reserve1));
    console.log("\tPancakePair blockTimestampLast: ",reserves._blockTimestampLast);
  });
  it("Should impersonate 0xffefE959d8bAEA028b1697ABfc4285028d6CEB10", async function () {

    const { legoContract } = await loadFixture(initializePancakeFixture);
    const impersonateAddress = "0xffefE959d8bAEA028b1697ABfc4285028d6CEB10";
    // impersonating account
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [impersonateAddress],
    });
    const signer = await ethers.getSigner(impersonateAddress);

    console.log("Impersonating address: ", signer.address);
    console.log("Impersonating address bnb balance: ", ethers.utils.formatEther(await signer.getBalance()));
    console.log("Impersonating address PancakeLP balance: ", ethers.utils.formatEther(await signer.getBalance()));
    console.log("Impersonating address LEGOToken balance: ", ethers.utils.formatEther(await legoContract.balanceOf(signer.address)));
  });


// TODO:

  it("Should swap LEGOToken for BUSD", async function () {

    const { pancakePair, legoContract } = await loadFixture(initializePancakeFixture);
    const impersonateAddress = "0xffefE959d8bAEA028b1697ABfc4285028d6CEB10";
    // impersonating account
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [impersonateAddress],
    });
    const signer = await ethers.getSigner(impersonateAddress);

    await expect(pancakePair.swap("1","1",signer.address,"0x00")).not.to.be.reverted;
  });
});
