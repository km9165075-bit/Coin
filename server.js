const express = require('express');
const Blockchain = require('./blockchain');
const Transaction = require('./transaction');

const app = express();
app.use(express.json());

const karthikCoin = new Blockchain();

app.get('/', (req, res) => {
    res.send('KarthikCoin Blockchain API Running');
});

app.get('/chain', (req, res) => {
    res.json(karthikCoin);
});

app.post('/transaction', (req, res) => {

    const { sender, receiver, amount } = req.body;

    karthikCoin.createTransaction(
        new Transaction(
            sender,
            receiver,
            amount
        )
    );

    res.json({
        message: 'Transaction Added'
    });
});

app.get('/mine/:miner', (req, res) => {

    karthikCoin.minePendingTransactions(
        req.params.miner
    );

    res.json({
        message: 'Block Mined',
        miner: req.params.miner
    });
});

app.get('/balance/:address', (req, res) => {

    res.json({
        address: req.params.address,
        balance:
            karthikCoin.getBalanceOfAddress(
                req.params.address
            )
    });
});

app.listen(3000, () => {
    console.log(
        'Server running on http://localhost:3000'
    );
});