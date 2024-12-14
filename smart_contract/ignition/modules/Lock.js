import { JsonRpcProvider } from 'ethers';

// Connect to the Ethereum network
const provider = new JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/Y4wTq7q2uZylCor6WilSP5iosr45PX5_");

// Get block by number
const blockNumber = "latest";
const block = await provider.getBlock(blockNumber);

console.log(block);