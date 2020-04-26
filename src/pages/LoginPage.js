export default class LoginPage {

  constructor(page) {
    this.page = page;
  }
  async login(user_id, user_password) {
    await this.page.waitAndType('#user_login', user_id);
    await this.page.waitAndType('#user_password', user_password);
    await this.page.waitAndClick('#user_remember_me');
    await this.page.waitAndClick('input[type=submit]');
  }
}
