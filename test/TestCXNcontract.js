const helpers = require('./helpers');

contract('CXNcontract', (accounts) => {

    describe("Basic", () => {
        it("Sets valid attributes", function (done) {
            helpers.deployCXNContract().then((element) => {
                element._preValidatePurchase(0x627306090abab3a6e1400e9345bc60c78a8bef57, 2e10)
                    .then(() => {
                        done();
                    })
            })
        })
    })

})