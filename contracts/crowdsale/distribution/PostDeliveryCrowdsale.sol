pragma solidity ^0.4.18;

import "../validation/TimedCrowdsale.sol";
import "../../token/ERC20/ERC20.sol";
import "../../math/SafeMath.sol";
import "../../ownership/Ownable.sol";

/**
 * @title PostDeliveryCrowdsale
 * @dev Crowdsale that locks tokens from withdrawal until it ends.
 */
contract PostDeliveryCrowdsale is TimedCrowdsale, Ownable {
  using SafeMath for uint256;

  mapping(address => uint256) public balances;

  /**
   * @dev Overrides parent by storing balances instead of issuing tokens right away.
   * @param _beneficiary Token purchaser
   * @param _tokenAmount Amount of tokens purchased
   */
  function _processPurchase(address _beneficiary, uint256 _tokenAmount) internal {
    balances[_beneficiary] = balances[_beneficiary].add(_tokenAmount);
  }

  /**
   * @dev Withdraw tokens only after crowdsale ends.
   */
  function withdrawTokens(address _beneficiary) public onlyOwner {
    require(hasClosed());
    uint256 amount = balances[_beneficiary];
    require(amount > 0);
    balances[_beneficiary] = 0;
    _deliverTokens(_beneficiary, amount);
  }
}
