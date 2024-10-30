import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProductsCardComponent } from './home-products-card.component';

describe('HomeProductsCardComponent', () => {
  let component: HomeProductsCardComponent;
  let fixture: ComponentFixture<HomeProductsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeProductsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeProductsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
