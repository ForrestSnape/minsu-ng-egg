import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleCategoryCategoryAddComponent } from './category-add.component';

describe('ArticleCategoryCategoryAddComponent', () => {
  let component: ArticleCategoryCategoryAddComponent;
  let fixture: ComponentFixture<ArticleCategoryCategoryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleCategoryCategoryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCategoryCategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
