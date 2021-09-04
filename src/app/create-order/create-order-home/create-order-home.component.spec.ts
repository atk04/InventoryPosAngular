import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderHomeComponent } from './create-order-home.component';

describe('CreateOrderHomeComponent', () => {
  let component: CreateOrderHomeComponent;
  let fixture: ComponentFixture<CreateOrderHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrderHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
