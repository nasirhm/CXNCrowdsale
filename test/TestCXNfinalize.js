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
        let timeNow = (Date.now() / 1000).toFixed(0);
        console.log("Time now is : " + timeNow);

        let getRate = ()=> {
            if (timeNow > privSale1start && timeNow < privSale1end) 
                  return 14375; // Stage I
              else if (timeNow > privSale2start && timeNow < privSale2end) 
                  return 13750; // Stage II
              else if (timeNow > saleStart && timeNow < saleEnd) 
                  return 12500; // Public Sale
              return 0;
          };

          console.log("getrate " + getRate())

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

            let cap = web3.toWei(20000, "ether" );
            let goal = web3.toWei(10000, "ether" );
            let owner = web3.eth.coinbase;

            console.log('Token Address is : ' + token.address);          

            saleEnd = privSale1start + 1;
            contract = await CxNcontract.new(privSale1start, saleEnd, 
                owner, cap, 
                token.address, goal);
            
            console.log('Contract Address is : ' + contract.address);
            
        });


        it("Check Finalize", async function(){
            assert.equal(true,(await contract.hasClosed()),"Should be true")
            console.log("contract has closed: " + (await contract.hasClosed()))
            let finalize = await contract.finalize({gas:500000});
            console.log(finalize);
        })

        


    });

});