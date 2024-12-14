const hre = require("hardhat");

async function main() {
  const TransactionsFactory = await hre.ethers.getContractFactory("Transactions");
  console.log("Deploying Transactions contract...");
  const transactionsContract = await TransactionsFactory.deploy();

  await transactionsContract.waitForDeployment();

  console.log("Transactions contract deployed to:", await transactionsContract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//0x1A70db57AB2a71E966Bf6956BDD5959251f42DFa