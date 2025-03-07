import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {CryptoMuchPriceService} from '../../shared/services/crypto-much-price.service';
import {
  combineLatest,
  filter,
  map,
  Observable,
  shareReplay,
  startWith,
  Subject,
  take,
  takeUntil,
} from 'rxjs';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
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
export class TransportTicketPurchaseComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  readonly dialog = inject(MatDialog);
  dogeCoinValue$!: Observable<number>;

  purchaseForm = new FormGroup({
    numberOfTickets: new FormControl(1, [Validators.required, Validators.min(1)]),
    ticketPriceUsd: new FormControl({value: 4, disabled: true}),
    totalCostUsd: new FormControl({value: 4, disabled: true}),
    totalCostDoge: new FormControl({value: 0, disabled: true}),
  });

  constructor(private cryptoMuchPriceService: CryptoMuchPriceService) {}

  ngOnInit(): void {
    // Call to get the Dogecoin price
    this.dogeCoinValue$ = this.cryptoMuchPriceService.getCryptos(['dogecoin']).pipe(
      map((cryptos) => cryptos[0].priceUsd),
      shareReplay(1) // Cache the value
    );

    // Combine the number of tickets and Dogecoin price to calculate the total cost
    combineLatest([
      this.purchaseForm.get('numberOfTickets')!.valueChanges.pipe(
        startWith(1), // Initial value
        filter((value) => value !== null),
        map((value) => value as number)
      ),
      this.dogeCoinValue$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([numberOfTickets, dogeCoinPrice]) => {
        // Calculate the total cost in USD
        const totalCostUsd = this.calculateTotalCostUsd(numberOfTickets);
        this.purchaseForm.get('totalCostUsd')?.setValue(totalCostUsd);

        // Calculate the total cost in Dogecoin
        const totalCostDoge = totalCostUsd / dogeCoinPrice;
        this.purchaseForm.get('totalCostDoge')?.setValue(Math.round(totalCostDoge * 100) / 100);
      });
  }

  calculateTotalCostUsd(numberOfTickets: number): number {
    const ticketPrice = 4;
    let totalCost = numberOfTickets * ticketPrice;
    if (numberOfTickets >= 2) {
      totalCost *= 0.95; // 5% discount after 2 tickets
    }
    return Math.round(totalCost * 100) / 100; // round to 2 decimal places
  }

  purchaseTickets(): void {
    const dialogRef = this.dialog.open(PurchaseConfirmationModalComponent, {
      width: '500px',
      data: {
        form: this.purchaseForm.getRawValue(),
      },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        console.log(`ok confirmation: ${result}`);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
