import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartRoomComponent } from './room.component';

describe('ChartRoomComponent', () => {
  let component: ChartRoomComponent;
  let fixture: ComponentFixture<ChartRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
