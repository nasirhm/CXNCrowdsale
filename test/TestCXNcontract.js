var CXNcontract = artifacts.require("./contract/CXNcontract.sol");
var StandardToken = artifacts.require("./token/ERC20/CxNtoken.sol");
//const helpers = require('./helpers');

contract('CXNcontract', (accounts) => {

    describe("Basic", () => {
        it("Sets valid attributes", async function (done) {

            let cap = web3.fromWei(20000000000000000000000, "ether" );
            let goal = web3.fromWei(10000000000000000000000, "ether" );

            let token = await StandardToken.new();

            console.log('Token Address is : ' + token.address);

            let contract = await CXNcontract.new(1523426400, 1523926800, 
                web3.eth.coinbase, cap, 
                token.address, goal);
            
            console.log('Contract Address is : ' + contract.address);


        });
    });

});