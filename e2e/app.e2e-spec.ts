import { AbsenteePage } from './app.po';

describe('absentee App', function() {
  let page: AbsenteePage;

  beforeEach(() => {
    page = new AbsenteePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
