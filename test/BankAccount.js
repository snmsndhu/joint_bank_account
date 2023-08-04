const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("BankAccount", function () {
  async function deployBankAccount() {
    const [addr0, addr1, addr2, addr3, addr4] = await ethers.getSigners();

    const BankAccount = await ethers.getContractFactory("BankAccount");
    const bankAccount = await BankAccount.deploy();

    return { bankAccount, addr0, addr1, addr2, addr3, addr4 };
  }
  async function deployBankAccountWithAccounts(
    owners = 1,
    deposit = 0,
    withdrawlAmount = []
  ) {
    const { addr0, addr1, addr2, addr3, addr4 } = await loadFixture(
      deployBankAccount
    );
    const addresses = [];
    if (owners == 2) addresses = [addr1.address];
    else if (owners == 3) addresses = [addr1.address, addr2.address];
    else if (owners == 4)
      address = [addr1.address, addr2.address, addr3.address];
  }

  describe("Deployment", () => {
    it("should deploy without error", async () => {
      await loadFixture(deployBankAccount);
    });
  });

  describe("creating an account", () => {
    it("should allow creating a single user account", async () => {
      const { bankAccount, addr0 } = await loadFixture(deployBankAccount);
      await bankAccount.connect(addr0).createAccount([]);
      const accounts = await bankAccount.connect(addr0).getAccounts();
      expect(accounts.length).to.equal(1);
    });

    it("should allow creating a double user account", async () => {
      const { bankAccount, addr0, addr1 } = await loadFixture(
        deployBankAccount
      );
      await bankAccount.connect(addr0).createAccount([addr1.address]);

      const accounts1 = await bankAccount.connect(addr0).getAccounts();
      expect(accounts1.length).to.equal(1);

      const accounts2 = await bankAccount.connect(addr1).getAccounts();
      expect(accounts2.length).to.equal(1);
    });

    it("should allow creating a triple user account", async () => {
      const { bankAccount, addr0, addr1, addr2 } = await loadFixture(
        deployBankAccount
      );
      await bankAccount
        .connect(addr0)
        .createAccount([addr1.address, addr2.address]);

      const accounts1 = await bankAccount.connect(addr0).getAccounts();
      expect(accounts1.length).to.equal(1);

      const accounts2 = await bankAccount.connect(addr1).getAccounts();
      expect(accounts2.length).to.equal(1);

      const accounts3 = await bankAccount.connect(addr2).getAccounts();
      expect(accounts3.length).to.equal(1);
    });

    it("should allow creating a quad user account", async () => {
      const { bankAccount, addr0, addr1, addr2, addr3 } = await loadFixture(
        deployBankAccount
      );
      await bankAccount
        .connect(addr0)
        .createAccount([addr1.address, addr2.address, addr3.address]);

      const accounts1 = await bankAccount.connect(addr0).getAccounts();
      expect(accounts1.length).to.equal(1);

      const accounts2 = await bankAccount.connect(addr1).getAccounts();
      expect(accounts2.length).to.equal(1);

      const accounts3 = await bankAccount.connect(addr2).getAccounts();
      expect(accounts3.length).to.equal(1);

      const accounts4 = await bankAccount.connect(addr3).getAccounts();
      expect(accounts4.length).to.equal(1);
    });

    it("should not allow creating an account with duplicate owners", async () => {
      const { bankAccount, addr0 } = await loadFixture(deployBankAccount);
      await expect(bankAccount.connect(addr0).createAccount([addr0.address])).to
        .be.reverted;
      console.log();
    });

    it("should not allow creating an account with duplicate owners", async () => {
      const { bankAccount, addr0, addr1, addr2, addr3, addr4 } =
        await loadFixture(deployBankAccount);
      await expect(
        bankAccount
          .connect(addr0)
          .createAccount([
            addr0.address,
            addr1.address,
            addr2.address,
            addr3.address,
            addr4.address,
          ])
      ).to.be.reverted;
    });

    it("should not allow creating an more then 3 accounts", async () => {
      const { bankAccount, addr0 } = await loadFixture(deployBankAccount);

      for (let idx = 0; idx < 3; idx++) {
        await bankAccount.connect(addr0).createAccount([]);
      }
      await expect(bankAccount.connect(addr0).createAccount([])).to.be.reverted;
    });
  });

  describe("Depositing", () => {});
});
