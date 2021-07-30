const Block = require('./block.js');

class Blockchain{

    // resposible for initializing our BCH.
    // chain is a array of blocks.
    // the first block is genesis block,
    // and will be created manually.
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    // this fun make a first block of a BCH.
    createGenesisBlock(){
        return new SimpleBlock(0, "30-04-2021", "Genesis Block", "0");
    }

    // this fun returns the last block in the BCH.
    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }

    // this fun will add new block to the BCH.
    // first set the previous hash.
    // second updateing the hash data.
    // add it to the chain.
    addBlock(newBlock){
        newBlock.previousHash = this.getLastBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

}

module.exports.Blockchain = Blockchain;

// let BCH = new Blockchain();
// BCH.addBlock(new Block(1, "30-04-2021", {data: "first Block"}));
// BCH.addBlock(new Block(2, "30-04-2021", {data: "second Block"}));

// console.log(JSON.stringify(BCH, null, 4));