import {TestBed} from '@angular/core/testing';

import {CryptoExchangeService} from './crypto-exchange.service';

describe('CryptoExchangeServiceTsService', () => {
  let service: CryptoExchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoExchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
