import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleCategoryCategoryListComponent } from './category-list.component';

describe('ArticleCategoryCategoryListComponent', () => {
  let component: ArticleCategoryCategoryListComponent;
  let fixture: ComponentFixture<ArticleCategoryCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleCategoryCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCategoryCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
