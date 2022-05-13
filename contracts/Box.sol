// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./GetFee.sol";
import "./Game.sol";
import "./Hero.sol";
import "./NFT.sol";

contract Box is Ownable{
    constructor() {
    }
    IERC20 public erc20 = IERC20(0x0a2231B33152d059454FF43F616E4434Afb6Cc64);
    mapping(uint256=>address) _boxByUser;
    mapping(address=>uint256[]) _userBoxs;
    uint256 _boxId = 0;
    uint256 _boxPrice=100*10**18;
    Game public  _game;
    Hero _hero = Hero(0xCDdB3Df2ecEa4A23ddf36644B82920677be3FFB2);
    GetFee public getFeeRate = GetFee(0x94329c959B84B373bca334EE171192863beF07f0);
    NFT public _nft = NFT(0x03960BF2C1074c915a86618433f1E580C3cbfA59);
    uint256 _lockTime = 12*3600;
    uint256 _temNum=5;


    struct monsterInfo{
        uint256 rarity;
        uint256 ce;
        uint256 armor;
        uint256 luk;
        string name; 
    }
     
    event BuyBox(uint32 index,uint256 price,address sender);
    event OpenBox(uint256 indexed rarity,uint256 indexed tokenId,uint256 monsterId,address sender);
    
    function buyBox()  public {
        uint256 amount=100*10**18  ;
        amount = getFeeRate.getUsdtPrice1(_boxPrice);
        
        require(erc20.allowance(msg.sender, address(this)) >= amount, "allowance amount not enough");
        erc20.transferFrom(msg.sender, address(this), amount);
        _boxByUser[_boxId]= msg.sender;
        _userBoxs[msg.sender].push(_boxId);
        _boxId +=1;
        _hero.initHeroEq(msg.sender);
        emit BuyBox(1,uint256(amount),msg.sender);
    }
    
    function openBox(uint32 _index)  public {
        require(_boxByUser[_index] == msg.sender,"Insufficient permissions");
       
        uint256 tokenId;
        uint256 nftKindId;
        uint256 monsterId;
        monsterInfo memory _monster ;
        (nftKindId,monsterId,_monster.ce,_monster.armor,_monster.luk,_monster.name) = _hero.getMonsterType();
        tokenId = _nft.safeMint(msg.sender);
        _game.createCard(tokenId,_monster.ce,_monster.armor,_monster.luk,_lockTime, nftKindId,_monster.name,_temNum,msg.sender);
        
        for(uint256 i=0;i<_userBoxs[msg.sender].length;i++){
            if(_userBoxs[msg.sender][i] == _index){
                // delete _userBoxs[msg.sender][i] ;
                // _userBoxs[msg.sender][i] = _userBoxs[msg.sender][_userBoxs[msg.sender].length - 1];
                _userBoxs[msg.sender][i] = _userBoxs[msg.sender][_userBoxs[msg.sender].length - 1];
                _userBoxs[msg.sender].pop();
            }
        }
        emit OpenBox(nftKindId,tokenId,monsterId,msg.sender);
    }

    function getUserBoxs(address sender) view public returns(uint256[] memory){
        return _userBoxs[sender];
    }

    function setBoxPrice(uint256 boxPrice) public onlyOwner{
        _boxPrice = boxPrice;
    }

    function getBoxPrice() public view returns(uint256 amounts){
        amounts = getFeeRate.getUsdtPrice1(_boxPrice);
        return amounts;
    }

    function withdrawal(address tokenAddress,address from,address to,uint256 amount) public onlyOwner{
        IERC20(tokenAddress).transferFrom(from, to, amount);
    }

    function setGame(address payable _gameAddress) public onlyOwner{
        _game = Game(_gameAddress);
    }

    function setRouter(address _feeAddress) public onlyOwner{
        getFeeRate = GetFee(_feeAddress);
    }

    function setERC20Addr(address _tokenAddress)public onlyOwner{
        erc20 = IERC20(_tokenAddress);
    }

    function setHero(address _tokenAddress)public onlyOwner{
        _hero = Hero(_tokenAddress);
    }
    function setNftToken(address _NFTToken)  public onlyOwner {
        _nft = NFT(_NFTToken);
    }
 
}