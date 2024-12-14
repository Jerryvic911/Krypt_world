import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constant";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
  }

export const TransactionsProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState();
    const [formData, setFormData] = useState({address: "", amount: "", keyword: "", message: ""})
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
         setFormData((prevstate) => ({...prevstate, [name]: e.target.value}))
    }

    const getAllTransactions = async () => {
        try {
            if (!ethereum) return alert("Get Metamask!");
            const transactionContract = await getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();
    
            // Log the available transactions to inspect their structure
            console.log(availableTransactions);
    
            const structuredTransactions = availableTransactions.map((transaction) => {
                // Check the type of timestamp and handle accordingly
                const timestamp = transaction.timestamp && transaction.timestamp.toNumber 
                    ? transaction.timestamp.toNumber() * 1000 
                    : Number(transaction.timestamp) * 1000; // Fallback to Number if it's not a BigNumber
                    
    
                return {
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(timestamp).toLocaleString(),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: ethers.formatEther(transaction.amount)
                };
            });
    
            console.log(structuredTransactions);
            setTransactions(structuredTransactions);
        } catch (error) {
            console.log(error);
            throw new Error("No eth object found!");
        }
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Get Metamask!");

            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                 getAllTransactions();
            } else {
                console.log("No Accounts found!");
            }

            console.log(accounts);
        } catch (error) {
            console.log(error);
            throw new Error("No eth wallet found!");
        }
    }

    const checkIfTransactionExists = async () => {
        try {
            const transactionContract = await  getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();

            window.localStorage.setItem("transactionCount", transactionCount);
        } catch (error) {
            console.log(error);
            throw new Error("No eth object found!");
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Get Metamask!");

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No eth wallet found!");
        }
    }

    const sendTransaction = async () => {
        try {
          if (!ethereum) return alert("Get Metamask!");

          const { addressTo, amount, keyword, message } = formData;
          const transactionContract = await  getEthereumContract(); 
          const parsedAmount = ethers.parseEther(amount);
          
      
          await ethereum.request({
            method: "eth_sendTransaction",
            params: [
                {
                    from: currentAccount,
                    to: addressTo,
                    gas: '21000',
                    value: parsedAmount.toString(),
                }]
          });
          console.log(transactionContract)
         const transactionHash = await transactionContract.addToBlockChain(addressTo, parsedAmount,keyword, message);
           setIsLoading(true);
           console.log(`Loading... ${transactionHash.hash}`);
           await transactionHash.wait();
           setIsLoading(false);
           console.log(`Success... ${transactionHash.hash}`);
           alert('Transaction successful!');
           await transactionHash.wait();

           const transactionCount = await transactionContract.getTransactionCount();
           console.log(typeof transactionCount); // Should be 'object' if it's a BigNumber
           setTransactionCount(Number(transactionCount));

        } catch (error) {
          console.log(error);
          throw new Error("Transaction failed");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionExists();
    }, []);

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, transactions,isLoading, handleChange, setFormData, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    );
}
