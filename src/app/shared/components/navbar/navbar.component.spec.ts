import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavbarComponent} from './navbar.component';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {of} from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

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
      imports: [NavbarComponent],
      providers: [{provide: ActivatedRoute, useValue: activatedRouteMock}],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
