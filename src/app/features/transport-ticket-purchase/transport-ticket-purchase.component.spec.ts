import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportTicketPurchaseComponent } from './transport-ticket-purchase.component';

describe('TransportTicketPurchaseComponent', () => {
  let component: TransportTicketPurchaseComponent;
  let fixture: ComponentFixture<TransportTicketPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportTicketPurchaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportTicketPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
