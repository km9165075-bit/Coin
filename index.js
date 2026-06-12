const Blockchain = require('./blockchain');
const Transaction = require('./transaction');

let karthikCoin = new Blockchain();

karthikCoin.createTransaction(
    new Transaction(
        "Alice",
        "Bob",
        100
    )
);

karthikCoin.createTransaction(
    new Transaction(
        "Bob",
        "Charlie",
        50
    )
);

console.log("Starting Miner...");

karthikCoin.minePendingTransactions("Karthik");

console.log("\nBalances After First Mining");

console.log(
    "Alice:",
    karthikCoin.getBalanceOfAddress("Alice")
);

console.log(
    "Bob:",
    karthikCoin.getBalanceOfAddress("Bob")
);

console.log(
    "Charlie:",
    karthikCoin.getBalanceOfAddress("Charlie")
);

console.log(
    "Karthik:",
    karthikCoin.getBalanceOfAddress("Karthik")
);

console.log("\nMining Reward Block...");

karthikCoin.minePendingTransactions("Karthik");

console.log(
    "Karthik Final Balance:",
    karthikCoin.getBalanceOfAddress("Karthik")
);

console.log(
    "\nBlockchain Valid:",
    karthikCoin.isChainValid()
);