const Transaction = require('./transaction');
const Blockchain = require('./blockchain');
const Block = require('./block');

let karthikCoin = new Blockchain();

console.log("Creating Block 1...");

karthikCoin.addBlock(
   new Block(
    1,
    "11/06/2026",
    new Transaction(
        "Alice",
        "Bob",
        100
    )
)
);

console.log("Creating Block 2...");

karthikCoin.addBlock(
    new Block(
    2,
    "11/06/2026",
    new Transaction(
        "Bob",
        "Charlie",
        50
    )
)
);

console.log(
    JSON.stringify(karthikCoin, null, 4)
);

console.log(
    "Is Blockchain Valid?",
    karthikCoin.isChainValid()
);

console.log("\nHacking Block 1...");

karthikCoin.chain[1].data.amount = 1000;

console.log(
    "Is Blockchain Valid After Tampering?",
    karthikCoin.isChainValid()
);
console.log("\nWallet Balances");

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

const Miner = require('./miner');

const miner = new Miner("Karthik");

console.log(
    "\nMining Reward:",
    miner.name,
    "earned",
    miner.reward,
    "KarthikCoins"
);