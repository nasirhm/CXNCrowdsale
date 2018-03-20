module.exports = {
  development: {
    host: "localhost",
    port: 8545,
    network_id: "4", // Match any network id,
    gas: 2000000,
    gasPrice: 20000000000 // 20 gwei
  },
  console: {
    host: "localhost",
    port: 8545,
    network_id: "4", // Match any network id,
    gas: 20000000,
    gasPrice: 200000000 // 10 gwei
  },
  rpc: {
    host: "localhost",
    port: 8545
  }
};
