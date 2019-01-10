import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAdminUserListComponent } from './list.component';

describe('UserAdminUserListComponent', () => {
  let component: UserAdminUserListComponent;
  let fixture: ComponentFixture<UserAdminUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdminUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdminUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
