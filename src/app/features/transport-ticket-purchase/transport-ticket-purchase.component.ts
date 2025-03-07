import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CryptoMuchPriceService} from '../../shared/services/crypto-much-price.service';
import {map, Observable} from 'rxjs';
import {ShortNumberPipe} from '../../shared/pipes/short-number.pipe';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {PurchaseConfirmationModalComponent} from './purchase-confirmation-modal/purchase-confirmation-modal.component';

@Component({
  selector: 'app-transport-ticket-purchase',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  templateUrl: './transport-ticket-purchase.component.html',
  styleUrl: './transport-ticket-purchase.component.scss',
})
export class TransportTicketPurchaseComponent {
  readonly dialog = inject(MatDialog);

  dogeCoinValue$: Observable<string>;
  purchaseForm = new FormGroup({
    numberOfTickets: new FormControl(1, Validators.required),
    ticketPriceUsd: new FormControl({value: 4, disabled: true}),
    totalCostUsd: new FormControl({value: 4, disabled: true}),
    totalCostDoge: new FormControl({value: 0, disabled: true}),
  });

  constructor(private cryptoMuchPriceService: CryptoMuchPriceService) {
    this.dogeCoinValue$ = this.cryptoMuchPriceService
      .getCryptos(['dogecoin'])
      .pipe(map((cryptos) => cryptos[0].priceUsd));
    this.purchaseForm.get('numberOfTickets')?.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.purchaseForm.get('totalCostUsd')?.setValue(value * 4);
        this.dogeCoinValue$.subscribe((dogeCoinValue) => {
          this.purchaseForm.get('totalCostDoge')?.setValue((value * 4) / parseFloat(dogeCoinValue));
        });
      }
    });
  }

  purchaseTickets(): void {
    const dialogRef = this.dialog.open(PurchaseConfirmationModalComponent, {
      width: '500px',
      data: {
        form: this.purchaseForm.getRawValue(),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result:`);
    });
  }
}
