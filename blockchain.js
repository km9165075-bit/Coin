const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
    }

    createGenesisBlock() {
        return new Block(
            0,
            "01/01/2025",
            "Genesis Block",
            "0"
        );
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
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

    getBalanceOfAddress(address) {
        let balance = 0;

        for (const block of this.chain) {

            if (
                typeof block.data === "object" &&
                block.data.sender
            ) {

                if (block.data.sender === address) {
                    balance -= block.data.amount;
                }

                if (block.data.receiver === address) {
                    balance += block.data.amount;
                }
            }
        }

        return balance;
    }
}

module.exports = Blockchain;