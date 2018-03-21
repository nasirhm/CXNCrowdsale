pragma solidity ^0.4.21;

import "./crowdsale/distribution/FinalizableCrowdsale.sol";
import "./crowdsale/validation/CappedCrowdsale.sol";
import "./crowdsale/distribution/RefundableCrowdsale.sol";
import "./crowdsale/emission/MintedCrowdsale.sol";
import "./crowdsale/distribution/PostDeliveryCrowdsale.sol";
import "./token/ERC20/StandardToken.sol";

contract CXNcontract is CappedCrowdsale, RefundableCrowdsale, PostDeliveryCrowdsale {
    
    // Only for testNet:
    uint privSale1start = now;

    //    //  20 Mar 2018  07:00:00 PM CST
    //uint privSale1start = 1521594000;

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

    function CXNcontract(uint256 _openingTime, uint256 _closingTime, address _wallet, uint256 _cap, ERC20 _token, uint256 _goal) public 
        Crowdsale(_wallet, _token)
        CappedCrowdsale(_cap)
        TimedCrowdsale(_openingTime, _closingTime)
        RefundableCrowdsale(_goal) 
    {
        //As goal needs to be met for a successful crowdsale
        //the value needs to less or equal than a cap which is limit for accepted funds
        require(_goal <= _cap);
    }

    function _preValidatePurchase(address _beneficiary, uint256 _weiAmount) internal {
        assert(checkValue(_weiAmount));
        super._preValidatePurchase(_beneficiary, _weiAmount);
    }

    function _getTokenAmount(uint256 _weiAmount) internal view returns (uint256) {
        return _weiAmount.mul(getRate());
    }

    function checkValue(uint256 amount) internal view returns (bool){
        if (now > privSale1start && now < privSale2end) 
            return (amount >= 5 ether);
        else if (now > saleStart && now < saleEnd) 
            return (amount >= 0.1 ether);
        return false;
    }

    function getRate() public view returns (uint256) {
        
        if (now > privSale1start && now < privSale1end) 
            return 14375; // Stage I
        else if (now > privSale2start && now < privSale2end) 
            return 13750; // Stage II
        else if (now > saleStart && now < saleEnd) 
            return 12500; // Public Sale
        return 0;
    }
}