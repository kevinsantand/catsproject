import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CryptoPricesComponent} from './crypto-prices.component';
import {CryptoMuchPriceService} from '../../shared/services/crypto-much-price.service';
import {CryptoExchangeService} from '../../shared/services/crypto-exchange.service';
import {CryptoAsset} from '../../shared/models/crypto-much-price.model';
import {Exchange} from '../../shared/models/crypto-exchange.model';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {of} from 'rxjs';

describe('CryptoPricesComponent', () => {
  let component: CryptoPricesComponent;
  let fixture: ComponentFixture<CryptoPricesComponent>;
  let mockCryptoMuchPriceService: jest.Mocked<CryptoMuchPriceService>;
  let mockCryptoExchangeService: jest.Mocked<CryptoExchangeService>;

  const mockCryptos: CryptoAsset[] = [
    {
      id: 'dogecoin',
      rank: 8,
      symbol: 'DOGE',
      name: 'Dogecoin',
      supply: 140000000,
      maxSupply: 211000,
      marketCapUsd: 12000000000,
      volumeUsd24Hr: 500000000,
      priceUsd: 0.08,
      changePercent24Hr: 2.5,
      vwap24Hr: 0.079,
      explorer: '',
    },
    {
      id: 'bitcoin',
      rank: 1,
      symbol: 'BTC',
      name: 'Bitcoin',
      supply: 19000000,
      maxSupply: 21000000,
      marketCapUsd: 1000000000000,
      volumeUsd24Hr: 20000000000,
      priceUsd: 50000,
      changePercent24Hr: 1.2,
      vwap24Hr: 49800,
      explorer: '',
    },
  ];

  const mockExchanges: Exchange[] = [
    {
      exchangeId: 'binance',
      name: 'Binance',
      rank: 1,
      percentTotalVolume: 15.5,
      volumeUsd: 5000000000,
      tradingPairs: '500',
      socket: false,
      exchangeUrl: 'https://binance.com',
      updated: 1615000000000,
    },
    {
      exchangeId: 'coinbase',
      name: 'Coinbase',
      rank: 2,
      percentTotalVolume: 10.2,
      volumeUsd: 3000000000,
      tradingPairs: '300',
      socket: false,
      exchangeUrl: 'https://coinbase.com',
      updated: 1615000000000,
    },
  ];

  beforeEach(async () => {
    mockCryptoMuchPriceService = {
      getCryptos: jest.fn().mockReturnValue(of(mockCryptos)),
      getCryptosWithRefresh: jest.fn().mockReturnValue(of(mockCryptos)),
    } as unknown as jest.Mocked<CryptoMuchPriceService>;

    mockCryptoExchangeService = {
      getTopExchanges: jest.fn().mockReturnValue(of(mockExchanges)),
      getTopExchangesWithRefresh: jest.fn().mockReturnValue(of(mockExchanges)),
    } as unknown as jest.Mocked<CryptoExchangeService>;

    await TestBed.configureTestingModule({
      imports: [CryptoPricesComponent],
      providers: [
        {provide: CryptoMuchPriceService, useValue: mockCryptoMuchPriceService},
        {provide: CryptoExchangeService, useValue: mockCryptoExchangeService},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CryptoPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with crypto data and exchanges', () => {
    expect(mockCryptoExchangeService.getTopExchanges).toHaveBeenCalled();
    expect(mockCryptoMuchPriceService.getCryptosWithRefresh).toHaveBeenCalled();

    // verify that the data is correctly set
    component.muchPriceData$.subscribe((data) => {
      expect(data).toEqual(mockCryptos);
    });

    component.exchanges$.subscribe((data) => {
      expect(data).toEqual(mockExchanges);
    });
  });

  it('should extract Dogecoin data correctly', () => {
    component.dogecoinData$.subscribe((data) => {
      expect(data?.name).toBe('Dogecoin');
      expect(data?.priceUsd).toBe('0.08');
    });
  });

  it('should switch data source when tab changes', () => {
    // Simulate tab change
    const tabEvent = {index: 1} as MatTabChangeEvent;
    component.tabChange(tabEvent);
    // check that the active tab has changed
    expect(component.activeTab$.getValue()).toBe(1);
    // Check that the correct service method was called
    expect(mockCryptoExchangeService.getTopExchangesWithRefresh).toHaveBeenCalled();
  });

  it('should define correct column configurations', () => {
    // Verify columns for much prices data
    expect(component.muchPriceColumns.length).toBe(8);
    expect(component.muchPriceColumns[0].name).toBe('rank');
    expect(component.muchPriceColumns[1].property).toBe('name');

    // Verify columns for best exchanges data
    expect(component.bestExchangesColumns.length).toBe(5);
    expect(component.bestExchangesColumns[0].name).toBe('rank');
    expect(component.bestExchangesColumns[3].property).toBe('volumeUsd');
  });
});
