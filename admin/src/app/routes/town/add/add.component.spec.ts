import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TownAddComponent } from './add.component';

describe('TownAddComponent', () => {
  let component: TownAddComponent;
  let fixture: ComponentFixture<TownAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TownAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TownAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
