import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartStatisticComponent } from './statistic.component';

describe('ChartStatisticComponent', () => {
  let component: ChartStatisticComponent;
  let fixture: ComponentFixture<ChartStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
