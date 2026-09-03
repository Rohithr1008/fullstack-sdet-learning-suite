class AccountPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.welcome = page.getByTestId("welcome");
    this.logout = page.getByTestId("logout");
  }
}

module.exports = { AccountPage };
