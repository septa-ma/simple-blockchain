const SHA256 = require('crypto-js/sha256');
// const Blockchain = require('./blockchain.js');

class Block{

    // all datas every block needs to have
    // index is for saying where the block,
    // is on the chain.
    // timestamp when the block is created.
    // data every data you want to store.
    // previousHash is a sting that contains,
    // the hash of a previous block.
    // hash store the hash of a block.
    // nonce is a random number
    constructor(index, timestamp, data, previousHash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    // need to calculate the hash of a block.
    // this fun gets all the info of a block and,
    // calc its hash.
    // save the output as a string.
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    // every block need to proof that its work hardly.
    // for proofing, the BCH finder decides then every one 
    // try to solve a math problem and once who can 
    // solve sooner gets some rewards.
    // this problem calls mineing, that helps the chain to know the POW.
    // the problem is: 
    // int( hash (memPool + nonce + trx(12.5) )) < difficulty
    // trx(12.5) -> the rewards that the finder gets from network.
    // difficulty -> the pool master change it every 2 weeks:
    // newDiff = ( preDiff * 2016(per 2016 blocks, we need 10' for finding new block) * 
    // 10'(time of finding new block) ) / total time of fiding 2016 block
    // pool -> for improve the chance of getting more coin
    // pools made up, when you want to mine connect to a pool
    // the reward share between everyone who are in pool based on 
    // their rate hash(میزان سرمایه ای که هرکس تو این پول گذاشته)
    // memPool -> for mineing we need to do this:
    // listen to all the TRXs for being sure if this trx is valid,
    // then put all of their root hash in a block and find nonce for
    // it's a complex way so for make it simple
    // master of pool says I make one block as a memory(memPool) then 
    // everyone wants to mine come to me and get this block. 
    // memPool info includes: ( the root hash of all TRXs and hash of pre block )
    // then the user just need to find nonce for this block.
    // nonce -> is a random number that change each time 
    // and calc new hash till solve the problem.
    mineBlock(difficalty){
        while(this.hash.substring(0, difficalty) !== Array(difficalty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mine: " + this.hash);
    }

}  

// class blockchain{

//     // resposible for initializing our BCH.
//     // chain is a array of blocks.
//     // the first block is genesis block,
//     // and will be created manually.
//     // set difficalty in blockchain.
//     constructor(){
//         this.chain = [this.createGenesisBlock()];
//         this.difficalty = 5;
         
//     }

//     // this fun make a first block of a BCH.
//     createGenesisBlock(){
//         return new Block(0, "30-04-2021", "Genesis Block", "0");
//     }

//     // this fun returns the last block in the BCH.
//     getLastBlock(){
//         return this.chain[this.chain.length - 1];
//     }

//     // this fun will add new block to the BCH.
//     // first set the previous hash.
//     // second updateing the hash data.
//     // add it to the chain.
//     addBlock(newBlock){
//         newBlock.previousHash = this.getLastBlock().hash;
//         newBlock.mineBlock(this.difficalty);
//         this.chain.push(newBlock);
//     }

//     // for checking if the chain is valid or not.
//     // for this topic we need to loop over chain.
//     // start from 1 cause the first block is not a block.
//     // 1- check if the preHash-feild of new block is equal to 
//     // the hash-feild of last block, the chain is valid.
//     // 2- at the time calc hash of new block and 
//     // check it with the hash-feild of new block.
//     isChainValid(){
//         for(let i = 1; i < this.chain.length; i++){
//             const currentBlock = this.chain[i];
//             const previousBlock = this.chain[i-1];

//             if(currentBlock.hash !== currentBlock.calculateHash()){
//                 return false;
//             }

//             if(currentBlock.previousHash !== previousBlock.hash){
//                 return false;
//             }
//         }
//         return true;
//     }

// }

module.exports.Block = Block;

// let BCH = new blockchain();
// console.log('mineing block 1...');
// BCH.addBlock(new Block(1, "30-04-2021", {data: "first Block"}));

// console.log('mineing block 2...');
// BCH.addBlock(new Block(2, "25-04-2021", {data: "second Block"}));

// console.log(" is chain valid ? " + BCH.isChainValid());
// console.log(JSON.stringify(BCH, null, 4));

