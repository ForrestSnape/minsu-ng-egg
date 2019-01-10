import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleCategoryCategoryEditComponent } from './category-edit.component';

describe('ArticleCategoryCategoryEditComponent', () => {
  let component: ArticleCategoryCategoryEditComponent;
  let fixture: ComponentFixture<ArticleCategoryCategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleCategoryCategoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCategoryCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
