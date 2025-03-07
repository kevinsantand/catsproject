import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseConfirmationModalComponent } from './purchase-confirmation-modal.component';

describe('PurchaseConfirmationModalComponent', () => {
  let component: PurchaseConfirmationModalComponent;
  let fixture: ComponentFixture<PurchaseConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseConfirmationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
