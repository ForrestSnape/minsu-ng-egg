import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAdminUserAddComponent } from './add.component';

describe('UserAdminUserAddComponent', () => {
  let component: UserAdminUserAddComponent;
  let fixture: ComponentFixture<UserAdminUserAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdminUserAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdminUserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
