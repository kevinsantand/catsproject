import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {CryptoExchangeService} from './crypto-exchange.service';
import {provideHttpClient} from '@angular/common/http';

describe('CryptoExchangeServiceTsService', () => {
  let service: CryptoExchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CryptoExchangeService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CryptoExchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
