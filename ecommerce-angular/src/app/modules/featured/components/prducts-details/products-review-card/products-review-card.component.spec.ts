import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsReviewCardComponent } from './products-review-card.component';

describe('ProductsReviewCardComponent', () => {
  let component: ProductsReviewCardComponent;
  let fixture: ComponentFixture<ProductsReviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsReviewCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
