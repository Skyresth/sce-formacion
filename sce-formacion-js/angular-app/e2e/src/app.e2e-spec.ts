import { AppPage } from './app.po';

describe('angular-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the app title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Sample app');
  });
});
