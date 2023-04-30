import { expect } from "chai";
import { tokenFactory } from "./token-factory.contract";
import { ethers } from "ethers";

describe("TokenFactory", function () {
  context("IAM", async () => {
    it("init owner", async () => {
      const { deployer, contract } = await tokenFactory.setup();

      await expect(await contract.owner()).to.be.equal(deployer.address);
    });

    it("revert if not owner try withdraw tokens", async () => {
      const { alice, contract } = await tokenFactory.setup();

      await expect(
        contract.connect(alice).withdrawToken(alice.address, alice.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("revert if not owner try withdraw native tokens", async () => {
      const { alice, contract } = await tokenFactory.setup();

      await expect(
        contract.connect(alice).withdrawETH(alice.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("revert if not owner try withdraw native tokens", async () => {
      const { alice, contract } = await tokenFactory.setup();

      await expect(contract.connect(alice).changePrice(1)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
  });

  context("Create token", async () => {
    it("create token if user pay for it", async () => {
      const { alice, contract } = await tokenFactory.setup();

      await expect(
        contract
          .connect(alice)
          .createToken("Token", "TKN", 100000, {
            value: ethers.utils.parseEther("0.05"),
          })
      ).to.be.not.reverted;
    });

    it("reverts if user try create token and didn't pay for it", async () => {
      const { alice, contract } = await tokenFactory.setup();

      await expect(
        contract.connect(alice).createToken("Token", "TKN", 100000)
      ).to.be.revertedWith("TokenFactory: you didn't pay for token creation");
    });
  });
});
