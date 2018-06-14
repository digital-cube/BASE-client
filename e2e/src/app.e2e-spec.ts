import { AppPage } from './app.po';
import { element } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should show login screen', () => {
    page.navigateTo();
    expect(element(by.css('button.login-btn span')).getText()).toEqual('Login');
  });
});
