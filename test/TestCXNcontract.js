var CxNcontract = artifacts.require("./CxNcontract.sol");
var CxNtoken = artifacts.require("./CxNtoken.sol");
//const helpers = require('./helpers');

contract('CxNtoken', (accounts) => {

    let privSale1start = 1521594000;

    //  10 Apr 2018  11:59:00 PM CST
    let privSale1end = 1523426400;

    // 16 Apr 2018  07:00:00 PM CST
    let privSale2start = 1523926800;

    // 07 May 2018  11:59:00 PM CST
    let privSale2end = 1525759200;

    // 11 May 2018 07:00:00 PM CST
    let saleStart = 1526086800;

    // 18 Jun 2018 11:59:00 PM CST
    let saleEnd = 1526709600;

    describe("Setup", () => {

        let getRate = () => {
            let timeNow = (Date.now() / 1000).toFixed(0);
            console.log("Time now is : " + timeNow);
            
            if (timeNow > privSale1start && timeNow < privSale1end) {
                console.log("Stage I");
                return 14375; // Stage I
            } else if (timeNow > privSale2start && timeNow < privSale2end) {
                console.log("Stage II");
                return 13750; // Stage II
            } else if (timeNow > saleStart && timeNow < saleEnd) {
                console.log("Stage III");
                return 12500; // Public Sale
            } else {
                console.log("ENDED");
                return 0;
            }
          };

        let hasClosed = () => {
            let timeNow = (Date.now() / 1000).toFixed(0);
            return !(timeNow >= 1521594000 && timeNow <= 1526709600);
        };

        var token = null;
        var contract = null;
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

            contract = await CxNcontract.new(privSale1start, saleEnd, 
                owner, cap, 
                token.address, goal, accounts[1]);
            
            console.log('Contract Address is : ' + contract.address);
            
            let setOwner = await contract.owner();
            assert.equal(owner, setOwner , "Owner must be set");
            
            let expectedRate = getRate()

            let actualRate = await contract.getRate();

            assert.equal(expectedRate, actualRate.toNumber() , "Should return 14375, the private sale rate");
            
            assert.equal(cap, (await contract.cap()).toNumber() , "Cap must be set");

            //assert.equal(privSale1start, (await contract.startTime).toNumber(), "Start time must be set")
                
            assert.equal(saleEnd, (await contract.closingTime()).toNumber(), "Closing time must be set")

            assert.equal(goal, (await contract.goal()).toNumber(), "Goal must be set")
            
            assert.equal(owner,(await contract.owner()),"Owner Must Be Set")

            //set wei raised
            let weiRaised = await contract.weiRaised();
            console.log("Wei Raised is: " + weiRaised)
            let goalReached = (await contract.weiRaised() > goal)
            console.log("Goal Reached is: " + goalReached)   
            assert.equal(goalReached,(await contract.goalReached()),"Goal Reached Should be false")

            //Check cap reached
            let capReached = (await contract.weiRaised() >= cap)   
            console.log("Cap Reached is: " + capReached)
            assert.equal(capReached,(await contract.capReached()),"Cap Reached Should be false")

            //Check wallet
            assert.equal(owner,(await contract.wallet()),"Wallet Must Be Set")

            //Check Balance
            //  for(account in web3.eth.accounts){
            assert.equal(0,(await contract.balances(web3.eth.coinbase)),"Amount Must be zero")
            // }   

            console.log(hasClosed());
            assert.equal(hasClosed(), (await contract.hasClosed()) , "Must reflect if open or closed");
        });

        it("Check payment", async function () {
            let valueToSend = web3.toWei(5, "ether");
            console.log("Min value is " + valueToSend);
            let payTransaction = await contract.sendTransaction({ from: web3.eth.coinbase, value: valueToSend });

            let rate = getRate();

            let expectedTokens = rate * valueToSend;

            assert.equal(expectedTokens, (await contract.balances(web3.eth.coinbase)).toNumber(), "Balance is not correct")

            console.log(payTransaction.logs);
        });


    });

});