module.exports = {
  networks: {
  development: {
    host: "localhost",
    port: 8545,
    network_id: "4", // Match any network id,
    gas: 3000000,
    gasPrice: 20000000000 // 20 gwei
  },
  console: {
    host: "localhost",
    port: 8545,
    network_id: "4", // Match any network id,
    gas: 3000000,
    gasPrice: 2000000 // 20 gwei
  },
  rpc: {
    host: "localhost",
    port: 8545
  }
}
};
