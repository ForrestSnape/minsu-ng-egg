import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAdminUserEditComponent } from './edit.component';

describe('UserAdminUserEditComponent', () => {
  let component: UserAdminUserEditComponent;
  let fixture: ComponentFixture<UserAdminUserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdminUserEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdminUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
