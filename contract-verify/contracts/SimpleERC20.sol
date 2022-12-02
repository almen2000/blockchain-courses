// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SimpleERC20 is ERC20 {
    constructor(string memory _name, string memory _symbol)
        ERC20(_name, _symbol)
    {}

    function mint(address account, uint amount) public {
      _mint(account, amount);
    }

    function burn(uint amount) public {
      _burn(msg.sender, amount);
    }
}
