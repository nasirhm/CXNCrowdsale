pragma solidity ^0.4.19;


contract Ownable {
    address public owner;


    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);


    /**
     * @dev The Ownable constructor sets the original `owner` of the contract to the sender
     * account.
     */
    function Ownable() public {
        owner = msg.sender;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /**
     * @dev Allows the current owner to transfer control of the contract to a newOwner.
     * @param newOwner The address to transfer ownership to.
     */
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0));
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

}


contract CxNtoken {
    function totalSupply() public view returns (uint256);
    function balanceOf(address who) public view returns (uint256);
    function transfer(address to, uint256 value) public returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
}

contract CXNcontract is Ownable{

    CxNtoken token;

    // Only for testNet:
    uint privSale1start = now;

    //    //  20 Mar 2018  07:00:00 PM CST
    //    uint privSale1start = 1521594000;

    //  10 Apr 2018  11:59:00 PM CST
    uint privSale1end = 1523426400;

    // 16 Apr 2018  07:00:00 PM CST
    uint privSale2start = 1523926800;

    // 07 May 2018  11:59:00 PM CST
    uint privSale2end = 1525759200;

    // 11 May 2018 07:00:00 PM CST
    uint saleStart = 1526086800;

    // 18 Jun 2018 11:59:00 PM CST
    uint saleEnd = 1526709600;


    address public wallet = 0xc947aE55A26311FFA0Ea801c1ba8Edef1A603046;

    function CXNcontract() public {
        //
        token = CxNtoken(0x7BD85e4Acf2752149d2a10c789F5762FEa49EFf1);
    }

    function() public payable {
        require(checkValue(msg.value));
        wallet.transfer(msg.value);
    }

    function checkValue(uint256 amount) internal view returns (bool){
        if (now > privSale1start && now < privSale2end) return (amount >= 5 ether);
        else if (now > saleStart && now < saleEnd) return (amount >= 0.1 ether);
        return false;
    }

    function finishSale() public onlyOwner {
        require(now > saleEnd);
        require(token.balanceOf(this) >= 2800000 ether);

        address Bountyhive = 0x38B08071db8Acf1446F87161fb55dE9416DC8A6d;
        token.transfer(Bountyhive, 2800000 ether);
    }
}