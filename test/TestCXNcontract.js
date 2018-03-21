var CxNcontract = artifacts.require("./CxNcontract.sol");
var CxNtoken = artifacts.require("./CxNtoken.sol");
//const helpers = require('./helpers');

contract('CxNtoken', (accounts) => {

    describe("Setup", () => {
        let getRate = (privSale1start, privSale1end, privSale2start, privSale2end, saleStart, saleEnd)=> {
            if (Date.now() > privSale1start && Date.now() < privSale1end) 
                  return 14375; // Stage I
              else if (Date.now() > privSale2start && Date.now() < privSale2end) 
                  return 13750; // Stage II
              else if (Date.now() > saleStart && Date.now() < saleEnd) 
                  return 12500; // Public Sale
              return 0;
          };

        var token = null;
        it("Creates a valid token", function () {
            
            return CxNtoken.deployed().then(async function(instance) {

                token = instance;

                let totalSupply = web3.toWei(500000000, "ether" );

                let actualTotalSupply = await instance.totalSupply();
                
                assert.equal(totalSupply, actualTotalSupply.toNumber() , "Total supply incorrect");
            });
        });
        
        it("Sets valid attributes", async function () {

            let startTime = 1523426400;
            let endTime = 1523926800;
            let cap = web3.toWei(20000, "ether" );
            let goal = web3.toWei(10000, "ether" );
            let owner = web3.eth.coinbase;

            console.log('Token Address is : ' + token.address);

            let contract = await CxNcontract.new(startTime, endTime, 
                owner, cap, 
                token.address, goal);
            
            console.log('Contract Address is : ' + contract.address);
            
            let setOwner = await contract.owner();
            assert.equal(owner, setOwner , "Owner must be set");
            
            let expectedRate = getRate()
            let actualRate = await contract.getRate();

            assert.equal(expectedRate, actualRate.toNumber() , "Should return 14375, the private sale rate");

            //let payTransaction = await contract.sendTransaction({ value: web3.toWei(5, "ether") });
        });

        
    });

});