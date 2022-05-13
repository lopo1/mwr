//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.11;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IPancakeRouter01.sol";
contract GetFee is Ownable {
    constructor() {
    }
    address public usdtAddress = 0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684;
    address public tokenAddress = 0xe3Fa57Cc3514E132fD326D33B22bFAcDEC4F7c08;
    address public wbnbAddress = 0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd;
    IPancakeSwapRouter public router = IPancakeSwapRouter(0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3);
    function getRateByAddress(uint amountIn, address[] memory path) view public returns(uint[] memory amounts){
        amounts = router.getAmountsOut(amountIn, path);
        return amounts;
    }
    
    function getUsdtPrice(uint amountIn) public view  returns(uint[] memory amounts){
        address[] memory path = new address[](2);
        path[0] = usdtAddress;
        path[1] = tokenAddress;
        amounts = getRateByAddress(amountIn,path);
        return amounts;
    }
    function getUsdtPrice1(uint amountIn) public view  returns(uint){
        address[] memory pathBNB = new address[](2);
        pathBNB[0] = usdtAddress;
        pathBNB[1] = wbnbAddress;
        uint[] memory amountsBnb = getRateByAddress(amountIn,pathBNB);
        address[] memory path = new address[](2);
        path[0] = wbnbAddress;
        path[1] = tokenAddress;
        uint[] memory amounts = getRateByAddress(amountsBnb[1],path);
        return amounts[1];
    }

    function getBNBPrice1(uint amountIn) public view  returns(uint){
        address[] memory path = new address[](2);
        path[0] = wbnbAddress;
        path[1] = tokenAddress;
        uint[] memory amounts = getRateByAddress(amountIn,path);
        return amounts[1];
    }
    
    function setIpaddress(address _addr) public onlyOwner{
        router = IPancakeSwapRouter(_addr);
    }
    function setTokenddress(address _addr) public onlyOwner{
        tokenAddress = _addr;
    }
    function setUsdtddress(address _addr) public onlyOwner{
        usdtAddress = _addr;
    }

    function setWbnbddress(address _addr) public onlyOwner{
        wbnbAddress = _addr;
    }
}
