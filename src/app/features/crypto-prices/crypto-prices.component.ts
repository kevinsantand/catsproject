import {TableColumn, TableColumnType} from './../../shared/models/table-column.model';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {CryptoMuchPriceService} from '../../shared/services/crypto-much-price.service';
import {CommonModule} from '@angular/common';
import {MatTabChangeEvent, MatTabsModule} from '@angular/material/tabs';
import {DataTableComponent} from '../../shared/components/data-table/data-table.component';
import {CryptoExchangeService} from '../../shared/services/crypto-exchange.service';
import {BehaviorSubject, EMPTY, map, Observable, Subject, switchMap, takeUntil} from 'rxjs';
import {MatCardModule} from '@angular/material/card';
import {ShortNumberPipe} from '../../shared/pipes/short-number.pipe';
import {CryptoAsset} from '../../shared/models/crypto-much-price.model';
import {Exchange} from '../../shared/models/crypto-exchange.model';
import {APP_SETTINGS} from '../../app.config';

@Component({
  selector: 'app-crypto-prices',
  imports: [CommonModule, MatTabsModule, DataTableComponent, MatCardModule, ShortNumberPipe],
  templateUrl: './crypto-prices.component.html',
  styleUrl: './crypto-prices.component.scss',
})
export class CryptoPricesComponent implements OnInit, OnDestroy {
  muchPriceData$!: Observable<CryptoAsset[]>;
  exchanges$!: Observable<Exchange[]>;
  dogecoinData$!: Observable<CryptoAsset | undefined>;
  activeTab$ = new BehaviorSubject<number>(0);
  private destroy$ = new Subject<void>();

  muchPriceColumns: TableColumn[] = [
    {name: 'rank', label: '#', property: 'rank', type: TableColumnType.Text},
    {name: 'name', label: 'Name', property: 'name', type: TableColumnType.NameSymbol},
    {name: 'price', label: 'Price', property: 'priceUsd', type: TableColumnType.Currency},
    {
      name: 'marketCap',
      label: 'Market Cap',
      property: 'marketCapUsd',
      type: TableColumnType.BigNumber,
    },
    {name: 'vwap', label: 'VWAP (24Hr)', property: 'vwap24Hr', type: TableColumnType.Currency},
    {name: 'supply', label: 'Supply', property: 'supply', type: TableColumnType.BigNumber},
    {
      name: 'volume',
      label: 'Volume (24Hr)',
      property: 'volumeUsd24Hr',
      type: TableColumnType.BigNumber,
    },
    {
      name: 'change',
      label: 'Change (24Hr)',
      property: 'changePercent24Hr',
      type: TableColumnType.Percentage,
    },
  ];

  bestExchangesColumns: TableColumn[] = [
    {name: 'rank', label: '#', property: 'rank', type: TableColumnType.Text},
    {name: 'name', label: 'Name', property: 'name', type: TableColumnType.Text},
    {name: 'tradingPairs', label: 'Pairs', property: 'tradingPairs', type: TableColumnType.Text},
    {
      name: 'volumeUsd',
      label: '24h Volume',
      property: 'volumeUsd',
      type: TableColumnType.BigNumber,
    },
    {
      name: 'percentTotalVolume',
      label: '% Total Volume',
      property: 'percentTotalVolume',
      type: TableColumnType.Percentage,
    },
  ];

  constructor(
    private cryptoMuchPriceService: CryptoMuchPriceService,
    private cryptoExchangeService: CryptoExchangeService
  ) {}

  ngOnInit(): void {
    // Initial call to get top exchanges for the top card
    this.exchanges$ = this.cryptoExchangeService.getTopExchanges().pipe(takeUntil(this.destroy$));

    // Call to keep the Dogecoin data updated all the time
    this.dogecoinData$ = this.cryptoMuchPriceService
      .getCryptosWithRefresh(APP_SETTINGS.refresh.longInterval)
      .pipe(
        map((data) => data.find((crypto) => crypto.name === 'Dogecoin')),
        takeUntil(this.destroy$)
      );

    // Load data based on the active tab
    this.activeTab$
      .pipe(
        switchMap((tabIndex) => {
          if (tabIndex === 0) {
            // Markets tab is active
            this.muchPriceData$ = this.cryptoMuchPriceService
              .getCryptosWithRefresh(APP_SETTINGS.refresh.shortInterval)
              .pipe(takeUntil(this.destroy$));
          } else if (tabIndex === 1) {
            // Exchanges tab is active
            this.exchanges$ = this.cryptoExchangeService
              .getTopExchangesWithRefresh(APP_SETTINGS.refresh.shortInterval)
              .pipe(takeUntil(this.destroy$));
          }
          return EMPTY;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  tabChange(event: MatTabChangeEvent) {
    this.activeTab$.next(event.index);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
