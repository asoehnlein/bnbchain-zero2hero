const { expect } = require("chai");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");

describe("DogCoin", function () {

  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployDogCoinFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const DogCoin = await ethers.getContractFactory("DogCoin");
    const dogCoin = await DogCoin.deploy();

    const transferAmount = ethers.utils.parseUnits("10000",0);

    return { dogCoin, owner, otherAccount, transferAmount };
  }

  it("Should return the initial supply of 2000000 and 0 decimals", async function () {
    const { dogCoin } = await loadFixture(deployDogCoinFixture);

    const initialSupply = "2000000";
    const initialSupplyUnits = ethers.utils.parseUnits("2000000",0);

    console.log("\nLog:",initialSupplyUnits,"\n")

    expect(await dogCoin.totalSupply()).to.equal(initialSupplyUnits);
  });

  it("Should increase totalSupply by 1000 when owner calls", async function () {
    const { dogCoin, owner, otherAccount } = await loadFixture(deployDogCoinFixture);
    let currentSupply = await dogCoin.totalSupply();
    newSupply = Number(currentSupply) + 1000;
    expect(await dogCoin.increaseTotalSupply()).to.not.revertedWith("Not owner");
    expect(await dogCoin.totalSupply()).to.equal(newSupply);
  });

  it("Should revert totalSupply increase by 1000 when not owner calls", async function () {
    const { dogCoin, otherAccount } = await loadFixture(deployDogCoinFixture);
    let currentSupply = await dogCoin.totalSupply();
    newSupply = Number(currentSupply) + 1000;
    await expect (dogCoin.connect(otherAccount).increaseTotalSupply()).to.be.revertedWith("Not owner");
  });

  it("Should emit correct events when transfer", async function () {
    const { dogCoin, owner, otherAccount, transferAmount } = await loadFixture(deployDogCoinFixture);

    await expect(dogCoin.transferToken(transferAmount, otherAccount.address)).to.emit(dogCoin, "tokenTransfered").withArgs(transferAmount, otherAccount.address);
    let balanceOwner = await dogCoin.balances(owner.address);
    console.log("\nBalance owner:", balanceOwner);
    let balanceOtherAccount = await dogCoin.balances(otherAccount.address);
    console.log("\nBalance otherAccount:", balanceOtherAccount);
  });


});