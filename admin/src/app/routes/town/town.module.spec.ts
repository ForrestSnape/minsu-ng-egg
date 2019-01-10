import { TownModule } from './town.module';

describe('TownModule', () => {
  let townModule: TownModule;

  beforeEach(() => {
    townModule = new TownModule();
  });

  it('should create an instance', () => {
    expect(townModule).toBeTruthy();
  });
});
