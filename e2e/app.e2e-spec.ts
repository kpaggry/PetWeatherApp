import { PetWeatherAppPage } from './app.po';

describe('pet-weather-app App', () => {
  let page: PetWeatherAppPage;

  beforeEach(() => {
    page = new PetWeatherAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
