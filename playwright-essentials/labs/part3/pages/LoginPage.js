class LoginPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.email = page.getByLabel("Email");
    this.password = page.getByLabel("Password");
    this.submit = page.getByTestId("login-submit");
  }
  async goto() {
    await this.page.goto("/demo-app/login.html");
  }
  async signIn(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
    await this.page.waitForURL(/\/account(\.html)?\/?$/);
  }
}

module.exports = { LoginPage };
