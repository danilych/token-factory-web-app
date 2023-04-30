import { ethers } from "hardhat";
import { TokenFactory } from "../typechain-types";

export class TokenFactoryContract {
  protected contract: TokenFactory | null = null;

  async setup() {
    const [deployer, alice, bob] = await ethers.getSigners();

    this.contract = await (
      await ethers.getContractFactory("TokenFactory")
    ).deploy(ethers.utils.parseEther("0.05"));

    return {
      contract: this.contract,
      deployer,
      alice,
      bob,
    };
  }
}
export const tokenFactory = new TokenFactoryContract();
