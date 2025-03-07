import {TestBed} from '@angular/core/testing';

import {CryptoMuchPriceService} from './crypto-much-price.service';

describe('CryptoMuchPriceService', () => {
  let service: CryptoMuchPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoMuchPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
