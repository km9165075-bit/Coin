const Block = require('./block');
const Transaction = require('./transaction');

class Blockchain {

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
        this.pendingTransactions = [];
        this.miningReward = 50;
    }

    createGenesisBlock() {
        return new Block(
            0,
            Date.now(),
            "Genesis Block",
            "0"
        );
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    minePendingTransactions(miningRewardAddress) {

        let block = new Block(
            this.chain.length,
            Date.now(),
            this.pendingTransactions
        );

        block.previousHash = this.getLatestBlock().hash;

        console.log("Mining block...");
        block.mineBlock(this.difficulty);

        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(
                "SYSTEM",
                miningRewardAddress,
                this.miningReward
            )
        ];
    }

    getBalanceOfAddress(address) {

        let balance = 0;

        for (const block of this.chain) {

            if (Array.isArray(block.data)) {

                for (const transaction of block.data) {

                    if (transaction.sender === address) {
                        balance -= transaction.amount;
                    }

                    if (transaction.receiver === address) {
                        balance += transaction.amount;
                    }
                }
            }
        }

        return balance;
    }

    isChainValid() {

        for (let i = 1; i < this.chain.length; i++) {

            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

module.exports = Blockchain;