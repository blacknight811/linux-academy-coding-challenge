import { LinuxAcademyTestPage } from './app.po';

describe('linux-academy-test App', function() {
  let page: LinuxAcademyTestPage;

  beforeEach(() => {
    page = new LinuxAcademyTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
