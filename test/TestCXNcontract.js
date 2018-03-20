var CXNcontract = artifacts.require("./contract/CXNcontract.sol");
var StandardToken = artifacts.require("./token/ERC20/StandardToken.sol");
//const helpers = require('./helpers');

contract('CXNcontract', (accounts) => {

    describe("Basic", () => {
        it("Sets valid attributes", async function (done) {
            let cap = web3.fromWei(10000000, "ether" );
            let goal = web3.fromWei(1000000, "ether" );

            let token = await StandardToken.new();

            let contract = await CXNcontract.new(1523426400, 1523926800, 
                web3.eth.coinbase, cap, 
                token, goal);
            
        })
    })

})