import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemModuleComponent } from './module.component';

describe('SystemModuleComponent', () => {
  let component: SystemModuleComponent;
  let fixture: ComponentFixture<SystemModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
