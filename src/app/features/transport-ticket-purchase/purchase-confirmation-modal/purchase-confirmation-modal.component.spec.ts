import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PurchaseConfirmationModalComponent} from './purchase-confirmation-modal.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

describe('PurchaseConfirmationModalComponent', () => {
  let component: PurchaseConfirmationModalComponent;
  let fixture: ComponentFixture<PurchaseConfirmationModalComponent>;
  const mockDialogRef = {
    close: jest.fn(),
  };

  const mockDialogData = {
    form: {
      numberOfTickets: 3,
      ticketPriceUsd: 4,
      totalCostUsd: 11.4,
      totalCostDoge: 228,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseConfirmationModalComponent],
      providers: [
        {provide: MatDialogRef, useValue: mockDialogRef},
        {provide: MAT_DIALOG_DATA, useValue: mockDialogData},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
