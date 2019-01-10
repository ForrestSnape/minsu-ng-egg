import { IndustryModule } from './industry.module';

describe('IndustryModule', () => {
  let industryModule: IndustryModule;

  beforeEach(() => {
    industryModule = new IndustryModule();
  });

  it('should create an instance', () => {
    expect(industryModule).toBeTruthy();
  });
});
