import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {interval, map, Observable, of, startWith, switchMap, tap} from 'rxjs';
import {APP_SETTINGS} from '../../app.config';
import {Exchange} from '../models/crypto-exchange.model';

@Injectable({
  providedIn: 'root',
})
export class CryptoExchangeService {
  constructor(private http: HttpClient) {}

  getTopExchanges(): Observable<Exchange[]> {
    return this.http
      .get<{data: Exchange[]}>(`${APP_SETTINGS.api.baseUrl}/exchanges?limit=10`)
      .pipe(map((response) => response.data));
  }

  getTopExchangesWithRefresh(refreshInterval = 30000): Observable<Exchange[]> {
    return interval(refreshInterval).pipe(
      startWith(0),
      switchMap(() => this.getTopExchanges())
    );
  }
}
