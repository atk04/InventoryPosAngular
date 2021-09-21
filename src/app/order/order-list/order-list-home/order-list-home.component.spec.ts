import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListHomeComponent } from './order-list-home.component';

describe('OrderListHomeComponent', () => {
  let component: OrderListHomeComponent;
  let fixture: ComponentFixture<OrderListHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderListHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
