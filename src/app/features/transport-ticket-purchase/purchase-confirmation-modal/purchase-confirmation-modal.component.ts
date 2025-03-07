import {Component, Inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

interface PurchaseFormData {
  numberOfTickets: number;
  ticketPriceUsd: number;
  totalCostUsd: number;
  totalCostDoge: number;
}

@Component({
  selector: 'app-purchase-confirmation-modal',
  imports: [MatDialogModule, MatButton],
  templateUrl: './purchase-confirmation-modal.component.html',
  styleUrl: './purchase-confirmation-modal.component.scss',
})
export class PurchaseConfirmationModalComponent {
  constructor(
    public dialogRef: MatDialogRef<PurchaseConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {form: PurchaseFormData}
  ) {}

  get numberOfTickets(): number {
    return this.data.form.numberOfTickets || 0;
  }

  get totalCostUsd(): number {
    return this.data.form.totalCostUsd || 0;
  }

  get totalCostDoge(): number {
    return this.data.form.totalCostDoge || 0;
  }
}
