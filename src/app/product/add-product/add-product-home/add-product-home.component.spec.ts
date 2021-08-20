import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductHomeComponent } from './add-product-home.component';

describe('AddProductHomeComponent', () => {
  let component: AddProductHomeComponent;
  let fixture: ComponentFixture<AddProductHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
