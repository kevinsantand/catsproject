import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TransportTicketPurchaseComponent} from './transport-ticket-purchase.component';
import {CryptoMuchPriceService} from '../../shared/services/crypto-much-price.service';
import {of} from 'rxjs';
import {CryptoAsset} from '../../shared/models/crypto-much-price.model';

describe('TransportTicketPurchaseComponent', () => {
  let component: TransportTicketPurchaseComponent;
  let fixture: ComponentFixture<TransportTicketPurchaseComponent>;
  const cryptoMuchPriceServiceMock = {
    getCryptos: jest.fn().mockReturnValue(of([{priceUsd: 0.05}] as CryptoAsset[])),
    getCryptosWithRefresh: jest.fn().mockReturnValue(of([{priceUsd: 0.05}] as CryptoAsset[])),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportTicketPurchaseComponent],
      providers: [{provide: CryptoMuchPriceService, useValue: cryptoMuchPriceServiceMock}],
    }).compileComponents();

    fixture = TestBed.createComponent(TransportTicketPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update total cost Dogecoin when number of tickets changes', () => {
    const numberOfTicketsControl = component.purchaseForm.get('numberOfTickets');
    numberOfTicketsControl?.setValue(3); // Simulate user input
    fixture.detectChanges();

    // Verify that the total cost in Dogecoin has been updated
    expect(component.purchaseForm.get('totalCostDoge')?.value).toBeCloseTo(228); // Approximativement 11.4 USD / 0.05 USD
  });
});
