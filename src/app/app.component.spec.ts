import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {of} from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    const activatedRouteMock = {
      paramMap: of(convertToParamMap({})),
      queryParamMap: of(convertToParamMap({})),
      snapshot: {
        paramMap: convertToParamMap({}),
        queryParamMap: convertToParamMap({}),
      },
    };
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{provide: ActivatedRoute, useValue: activatedRouteMock}],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
