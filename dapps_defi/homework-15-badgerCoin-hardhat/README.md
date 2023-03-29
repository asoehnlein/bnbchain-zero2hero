# Deploy BadgerCoin using Hardhat

1. Run tests with `npx hardhat test`
2. Set privateKey for deployment and apiKey for verification in `secrets.json`
3. Configure networks in `hardhat.config.js`
4. Deploy using deploy script `npx hardhat run --network testnet scripts/deploy.js`
5. Verify contract on testnet `npx hardhat verify --network testnet <contractAddress>`