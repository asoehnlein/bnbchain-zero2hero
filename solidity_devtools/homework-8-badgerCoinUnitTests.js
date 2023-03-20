const { expect } = require("chai");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");

describe("BadgerCoin", function () {

  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployBadgerCoinFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const BadgerCoin = await ethers.getContractFactory("BadgerCoin");
    const badgerCoin = await BadgerCoin.deploy();

    return { badgerCoin, owner, otherAccount };
  }

  it("Should return the initial supply", async function () {

    const { badgerCoin } = await loadFixture(deployBadgerCoinFixture);

    const initialSupply = (1000000 * (10 ** 18)).toString();

    // expect(await badgerCoin.totalSupply()).to.equal(initialSupply);

    console.log("\nLog:",initialSupply,"\n")

    expect(await badgerCoin.totalSupply()).to.equal("1000000000000000000000000");
  });

/*   it("Should return 18 decimals", async function () {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const BadgerCoin = await ethers.getContractFactory("BadgerCoin");
    const badgerCoin = await BadgerCoin.deploy();

    const initialSupply = (1000000 * (10 ** 18)).toString();

    // expect(await badgerCoin.totalSupply()).to.equal(initialSupply);

    console.log("\nLog:",initialSupply,"\n")

    expect(await badgerCoin.totalSupply()).to.equal("1000000000000000000000000");
  }); */

  it("Should show balanceOf address is correct", async function () {

    const { badgerCoin, owner, otherAccount } = await loadFixture(deployBadgerCoinFixture);

    expect(await badgerCoin.balanceOf(owner.address)).to.equal("1000000000000000000000000");
    expect(await badgerCoin.balanceOf(otherAccount.address)).to.equal("0");
  });

  it("Should transfer amount correct", async function () {

    const { badgerCoin, owner, otherAccount } = await loadFixture(deployBadgerCoinFixture);

    expect(await badgerCoin.transfer(otherAccount.address,"69")).to.changeEtherBalances(
      [owner, badgerCoin],
      ["69", -"69"]
    );
    expect(await badgerCoin.balanceOf(otherAccount.address)).to.equal("69");
  });

  it("Should revert on transfer amount insufficient balance", async function () {

    const { badgerCoin, otherAccount } = await loadFixture(deployBadgerCoinFixture);

    await expect(badgerCoin.transfer(otherAccount.address,"1000000000000000000000001")).to.be.revertedWith("ERC20: transfer amount exceeds balance");
  });


});