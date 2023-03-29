# Deploy BadgerCoin using Hardhat

1. Run tests with `npx hardhat test`
2. Set privateKey for deployment and apiKey for verification in `secrets.json`
3. Configure networks in `hardhat.config.js`
4. Deploy using deploy script `npx hardhat run --network testnet scripts/deploy.js`
5. Verify contract on testnet `npx hardhat verify --network testnet <contractAddress>`

## Example contract

https://testnet.bscscan.com/token/0x9627e273b4b475e17b7f10cac1d1a0be8f8949ee#code