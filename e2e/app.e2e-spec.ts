import { FacebookloginPage } from './app.po';

describe('facebooklogin App', () => {
  let page: FacebookloginPage;

  beforeEach(() => {
    page = new FacebookloginPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
