import Page from '../builder';
import { step } from 'mocha-steps';
import { expect } from 'chai'
import LoginPage from '../pages/LoginPage';

describe('Config test', () => {
  let page;
  before(async () => {
    page = await Page.build('Desktop');
  });
  beforeEach( async () => {
    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] })
  });
  after(async () => {
    await page.close();
  })

  step('should load homepage', async () => {
    await page.goto('http://zero.webappsecurity.com/');
    expect(await page.isElementVisible('#signin_button')).to.be.true;
  });

  step('should display login form', async () => {
    await page.waitAndClick('#signin_button');
    expect(await page.isElementVisible([
      '#user_login',
      '#user_password',
      '#user_remember_me',
      'input[type=submit]'
    ].join(','))).to.be.true;
  });

  step('should login to application', async () => {
    await new LoginPage(page).login('username', 'password');
    expect(await page.isElementVisible('.nav-tabs')).to.be.true;
  });

  step('should have six navbar links', async () => {
    expect(await page.getCount('.nav-tabs li')).to.equal(6);
  });
});
