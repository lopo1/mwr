const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  /** Token */
  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();
  console.log("Token deployed to:", token.address);
  /** getFee */
  const GetFee = await hre.ethers.getContractFactory("GetFee");
  const getFee = await GetFee.deploy();
  await getFee.deployed();
  console.log("GetFee deployed to:", getFee.address);
  /** nft */
  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy();
  await nft.deployed();
  console.log("NFT deployed to:", nft.address);

  /** box */
  // We get the contract to deploy
  const Box = await hre.ethers.getContractFactory("Box");
  const box = await Box.deploy();
  await box.deployed();
  console.log("Box deployed to:", box.address);
  /** game */
  const Game = await hre.ethers.getContractFactory("Game");
  const game = await Game.deploy();
  await game.deployed();
  console.log("Game deployed to:", game.address);
  /** monster */
  const Monster = await hre.ethers.getContractFactory("Monster");
  const monster = await Monster.deploy();
  await monster.deployed();
  console.log("Monster deployed to:", monster.address);
  /** Arena */
  const Arena = await hre.ethers.getContractFactory("Arena");
  const arena = await Arena.deploy();
  await arena.deployed();
  console.log("Arena deployed to:", arena.address);
  /** Market */
  const Market = await hre.ethers.getContractFactory("Market");
  const market = await Market.deploy();
  await market.deployed();
  console.log("Market deployed to:", market.address);
  /** Hero */
  const Hero = await hre.ethers.getContractFactory("Hero");
  const hero = await Hero.deploy();
  await hero.deployed();
  console.log("Hero deployed to:", hero.address);

  // 初始化数据
  var erc20Token = token.address;
  var nftToken = nft.address;
  var priceRoter = getFee.address;
  // var erc20Token = "0x28ba88F74c4257e044d426a1e9E586024AA90c17";
  // var nftToken = "0x03960BF2C1074c915a86618433f1E580C3cbfA59";
  // var priceRoter = "0xC9d4412910DBB03F7fF854cE3F1a9c1f3ebCAf85";

  /**nft */
  const setBoxsetRoletx = await nft.setRole(box.address);
  await setBoxsetRoletx.wait();
  console.log("setnft success");
  /** Token */
  // const setGameTokenTx = await box.setGame(game.address);
  // await setGameTokenTx.wait();
  
  /**box */
  const setBoxErc20Tx = await box.setERC20Addr(erc20Token);
  await setBoxErc20Tx.wait();
  const setBoxNftTx = await box.setNftToken(nftToken);
  await setBoxNftTx.wait();
  const setBoxsetHeroTx = await box.setHero(hero.address);
  await setBoxsetHeroTx.wait();
  const setBoxsetRouterTx = await box.setRouter(priceRoter);
  await setBoxsetRouterTx.wait();
  const setBoxSetGameTx = await box.setGame(game.address);
  await setBoxSetGameTx.wait();
  console.log("setBox success");
  /** game */
  const setGameRouterAddressTx = await game.setRouterAddress(priceRoter);
  await setGameRouterAddressTx.wait();
  const setGameerc20TokenTx = await game.setErc20(erc20Token);
  await setGameerc20TokenTx.wait();
  const setsetMonsterTx = await game.setMonster(monster.address);
  await setsetMonsterTx.wait();
  const setGameRoloBoxTx = await game.setRole(box.address);
  await setGameRoloBoxTx.wait();
  const setGameRoloMarketTx = await game.setRole(market.address);
  await setGameRoloMarketTx.wait();
  const setGameRoloArenaTx = await game.setRole(arena.address);
  await setGameRoloArenaTx.wait();
  console.log("setGame success");

  /** monster */
  const setMonsterSetGameTx = await monster.setGame(game.address);
  await setMonsterSetGameTx.wait();
  const setMonstersetHERoTx = await monster.setHero(hero.address);
  await setMonstersetHERoTx.wait();
  console.log("setMonsterset success");

  /** Arena */
  const setArenasetGameTx = await arena.setGame(game.address);
  await setArenasetGameTx.wait();
  const setArenasetErc20Tx = await arena.setErc20(erc20Token);
  await setArenasetErc20Tx.wait();
  const setArenasetsetHerox = await arena.setHero(hero.address);
  await setArenasetsetHerox.wait();
  console.log("setArenaset success");

  /** Market */
  const setMarksetErc20AddrTx = await market.setErc20Addr(erc20Token);
  await setMarksetErc20AddrTx.wait();
  const setMarksetRouterAddrTx = await market.setRouterAddr(priceRoter);
  await setMarksetRouterAddrTx.wait();
  const setMarksetNFTAddrTx = await market.setNFTAddr(nftToken);
  await setMarksetNFTAddrTx.wait();
  const setMarksetGameTx = await market.setGame(game.address);
  await setMarksetGameTx.wait();
  console.log("setMarkset success");

  /** Hero */
  const setHerosetGameTx = await hero.setGame(game.address);
  await setHerosetGameTx.wait();
  const setHerosetERC20Tx = await hero.setToken(erc20Token);
  await setHerosetERC20Tx.wait();
  console.log("setHeroset success");

  /** GetFee */
  const setTokenGetFeeTx = await getFee.setTokenddress(erc20Token);
  await setTokenGetFeeTx.wait();
  const setUsdtGetFeeTx = await getFee.setUsdtddress("0x7ef95a0fee0dd31b22626fa2e10ee6a223f8a684");
  await setUsdtGetFeeTx.wait();
  const setBnbGetFeeTx = await getFee.setWbnbddress("0xae13d989dac2f0debff460ac112a837c89baa7cd");
  await setBnbGetFeeTx.wait();
  console.log("setGetFee success");

  // await verifyContract("contracts/Token.sol:Token", token.address);
  // await verifyContract("contracts/GetFee.sol:GetFee", getFee.address);
  // await verifyContract("contracts/NFT.sol:NFT", nft.address);
  // await verifyContract("contracts/Box.sol:Box", box.address);
  // await verifyContract("contracts/Game.sol:Game", game.address);
  // await verifyContract("contracts/Monster.sol:Monster", monster.address);
  // await verifyContract("contracts/Arena.sol:Arena", arena.address);
  // await verifyContract("contracts/Market.sol:Market", market.address);
  // await verifyContract("contracts/Hero.sol:Hero", hero.address);
}
async function verifyContract(contractName, contractAddress, args) {
  try {
      console.log("Verifying contract...");
      await hre.run("verify:verify", {
          contract: contractName, address: contractAddress, constructorArguments: args
      });
      console.log('Verification Completed')
      console.log("\n");
  } catch (err) {
      console.log('Already Verified')
      console.log("\n");
      console.log(err)
  }
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });