# CryptoMuchPriceService

The `CryptoMuchPriceService` is responsible for fetching data about cryptocurrency assets from an external API. It provides methods to get specific cryptocurrencies and to get cryptocurrencies with a periodic refresh.

## Methods

### `getCryptos(ids: string[]): Observable<CryptoAsset[]>`

Fetches specific cryptocurrencies from the API based on their IDs.

- **Parameters:**
  - `ids`: An array of cryptocurrency IDs to fetch.
- **Returns:** An `Observable` that emits an array of `CryptoAsset` objects.

#### Example

```typescript
cryptoMuchPriceService.getCryptos(['bitcoin', 'ethereum']).subscribe((cryptos) => {
  console.log(cryptos);
});
```

### `getCryptosWithRefresh(refreshInterval: number): Observable<CryptoAsset[]>`

Fetches cryptocurrencies from the API at a specified interval.

- **Parameters:**
  - `refreshInterval`: The interval in milliseconds at which to refresh the data.
- **Returns:** An `Observable` that emits an array of `CryptoAsset` objects at the specified interval.

#### Example

```typescript
cryptoMuchPriceService.getCryptosWithRefresh(60000).subscribe((cryptos) => {
  console.log(cryptos);
});
```

## Dependencies

- `HttpClient`: Angular's HTTP client for making HTTP requests.
- `APP_SETTINGS`: Configuration settings for the application, including the base URL for the API and the list of cryptocurrencies to fetch.
- `CryptoAsset`: The model representing a cryptocurrency asset.
- `CryptoResponse`: The model representing the API response for cryptocurrencies.

## Usage

To use the `CryptoMuchPriceService`, inject it into your component or service:

```typescript
import {Component, OnInit} from '@angular/core';
import {CryptoMuchPriceService} from '../../shared/services/crypto-much-price.service';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
})
export class CryptoListComponent implements OnInit {
  cryptos$!: Observable<CryptoAsset[]>;

  constructor(private cryptoMuchPriceService: CryptoMuchPriceService) {}

  ngOnInit(): void {
    this.cryptos$ = this.cryptoMuchPriceService.getCryptos(['bitcoin', 'ethereum']);
  }
}
```
