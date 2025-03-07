import {TransportTicketPurchaseComponent} from './features/transport-ticket-purchase/transport-ticket-purchase.component';
import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'crypto-prices',
    pathMatch: 'full',
  },
  {
    path: 'crypto-prices',
    loadComponent: () =>
      import('./features/crypto-prices/crypto-prices.component').then(
        (m) => m.CryptoPricesComponent
      ),
  },
  {
    path: 'buy-ticket',
    loadComponent: () =>
      import('./features/transport-ticket-purchase/transport-ticket-purchase.component').then(
        (m) => m.TransportTicketPurchaseComponent
      ),
  },
];
