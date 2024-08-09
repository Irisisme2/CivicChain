const MyToken = artifacts.require("MyToken");
const StakingRewards = artifacts.require("StakingRewards");

module.exports = async function(deployer, network, accounts) {
  const [deployerAccount] = accounts;

  // Deploy MyToken with the deployer's address as the initial owner
  await deployer.deploy(MyToken, deployerAccount);
  const myToken = await MyToken.deployed();

  // Deploy StakingRewards with MyToken as staking and reward token
  await deployer.deploy(StakingRewards, myToken.address, myToken.address);
  const stakingRewards = await StakingRewards.deployed();

  console.log(`MyToken deployed at: ${myToken.address}`);
  console.log(`StakingRewards deployed at: ${stakingRewards.address}`);
};
