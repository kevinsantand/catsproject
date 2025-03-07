import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {interval, map, Observable, of, startWith, switchMap, tap} from 'rxjs';
import {CryptoAsset, CryptoResponse} from '../models/crypto-much-price.model';
import {APP_SETTINGS} from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class CryptoMuchPriceService {
  constructor(private http: HttpClient) {}

  getCryptos(ids: string[]): Observable<CryptoAsset[]> {
    if (ids.length === 0) return of([]);
    return this.http
      .get<CryptoResponse>(`${APP_SETTINGS.api.baseUrl}/assets?ids=${ids.join(',')}`)
      .pipe(map((response) => response.data));
  }

  getCryptosWithRefresh(refreshInterval = 30000): Observable<CryptoAsset[]> {
    return interval(refreshInterval).pipe(
      startWith(0),
      switchMap(() => this.getCryptos([...APP_SETTINGS.crypto.list]))
    );
  }
}
