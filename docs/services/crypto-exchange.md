# CryptoExchangeService

The `CryptoExchangeService` is responsible for fetching data about cryptocurrency exchanges from an external API. It provides methods to get the top exchanges and to get the top exchanges with a periodic refresh.

## Methods

### `getTopExchanges(limit: number = 10): Observable<Exchange[]>`

Fetches the top exchanges from the API.

- **Parameters:**
  - `limit` (optional): The maximum number of exchanges to fetch. Default is 10.
- **Returns:** An `Observable` that emits an array of `Exchange` objects.

#### Example

```typescript
cryptoExchangeService.getTopExchanges(5).subscribe((exchanges) => {
  console.log(exchanges);
});
```

### `getTopExchangesWithRefresh(refreshInterval: number): Observable<Exchange[]>`

Fetches the top exchanges from the API at a specified interval.

- **Parameters:**
  - `refreshInterval`: The interval in milliseconds at which to refresh the data.
- **Returns:** An `Observable` that emits an array of `Exchange` objects at the specified interval.

#### Example

```typescript
cryptoExchangeService.getTopExchangesWithRefresh(60000).subscribe((exchanges) => {
  console.log(exchanges);
});
```

## Dependencies

- `HttpClient`: Angular's HTTP client for making HTTP requests.
- `APP_SETTINGS`: Configuration settings for the application, including the base URL for the API.
- `Exchange`: The model representing an exchange.

## Usage

To use the `CryptoExchangeService`, inject it into your component or service:

```typescript
import {Component, OnInit} from '@angular/core';
import {CryptoExchangeService} from '../../shared/services/crypto-exchange.service';

@Component({
  selector: 'app-exchange-list',
  templateUrl: './exchange-list.component.html',
})
export class ExchangeListComponent implements OnInit {
  exchanges$!: Observable<Exchange[]>;

  constructor(private cryptoExchangeService: CryptoExchangeService) {}

  ngOnInit(): void {
    this.exchanges$ = this.cryptoExchangeService.getTopExchanges();
  }
}
```
