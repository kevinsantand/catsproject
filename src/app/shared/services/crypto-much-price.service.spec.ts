import {TestBed} from '@angular/core/testing';

import {CryptoMuchPriceService} from './crypto-much-price.service';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('CryptoMuchPriceService', () => {
  let service: CryptoMuchPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CryptoMuchPriceService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(CryptoMuchPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
