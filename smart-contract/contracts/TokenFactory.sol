// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./Token.sol";

contract TokenFactory is Ownable {
    using SafeERC20 for IERC20;
    using SafeERC20 for Token;

    uint256 commission;

    uint256 price;

    constructor(uint256 commission_, uint256 price_) {
        commission = commission_;
        price = price_;
    }

    function createToken(
        string memory name,
        string memory symbol,
        uint256 amount
    ) external payable {
        require(
            msg.value >= price,
            "TokenFactory: you didn't pay for token creation"
        );

        Token token = new Token(name, symbol, amount);

        token.transferOwnership(_msgSender());

        token.safeTransfer(_msgSender(), amount);
    }

    function withdrawToken(address to, address token_) external onlyOwner {
        IERC20 tokenToWithdraw = IERC20(token_);
        tokenToWithdraw.safeTransfer(
            to,
            tokenToWithdraw.balanceOf(address(this))
        );
    }

    function withdrawETH(address payable to) external onlyOwner {
        to.transfer(address(this).balance);
    }

    receive() external payable {}
}
