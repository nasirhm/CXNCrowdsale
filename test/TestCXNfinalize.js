var CxNcontract = artifacts.require("./CxNcontract.sol");
var CxNtoken = artifacts.require("./CxNtoken.sol");
var RefundVault = artifacts.require("./crowdsale/distribution/utils/RefundVault.sol");

//const helpers = require('./helpers');

contract('CxNtoken', (accounts) => {

    var sleep = function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

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

        var token = null;
        var contract = null;
        
        let wallet = web3.eth.coinbase;

        it("Creates a valid token", function () {
            
            return CxNtoken.deployed().then(async function(instance) {
                token = instance;
                let totalSupply = web3.toWei(500000000, "ether" );
                let actualTotalSupply = await instance.totalSupply();
                assert.equal(totalSupply, actualTotalSupply.toNumber() , "Total supply incorrect");

                let walletBalance = await instance.balanceOf(wallet);
                assert.equal(walletBalance, actualTotalSupply.toNumber() , "Total supply in incorrect account");
            });
        });

        it("Sets valid attributes for finalize", async function () {

            let cap = web3.toWei(20000, "ether" );
            let goal = web3.toWei(10000, "ether" );

            console.log('Token Address is : ' + token.address);          

            saleEnd = privSale1start + 1;
            contract = await CxNcontract.new(privSale1start, saleEnd, 
                wallet, cap, 
                token.address, goal, accounts[1]);
            
            console.log('Contract Address is : ' + contract.address);
            
            //await contract.sendTransaction({value: web3.toWei(5, "ether" ) });
            //await sleep(5000);

        });

        it("Check Finalize", async function(){
            assert.equal(true,(await contract.hasClosed()),"Should be true")
            console.log("contract has closed: " + (await contract.hasClosed()))

            var tokenMain = await CxNtoken.at(token.address);
            //console.log(tokenMain);
            
            let balance = await tokenMain.balanceOf(wallet);
            console.log("Balance is " + balance.toNumber());

            let approved = await tokenMain.approve(contract.address, balance);

            let finalize = await contract.finalize();

            console.log(finalize.logs[0].args);
        })

        it("Check Vault", async function(){

            var vaultAddr = await contract.vault();
            
            console.log("Vault is " + vaultAddr);

            var vault = await RefundVault.at(vaultAddr);

   


        });
    });

});