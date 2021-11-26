import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    const ratingMock: Partial<BookRatingService> = {
      rateUp: (book: Book) => book,
      rateDown: (book: Book) => book,
      MIN: 1,
      MAX: 5
    };

    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      schemas: [NO_ERRORS_SCHEMA], // Shallow Component Test / alle Kindkomponenten ignorieren
      providers: [
        { provide: BookRatingService, useValue: ratingMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.rateUp() for onRateUp()', () => {
    const rs = TestBed.inject(BookRatingService);

    // BRS überwachen, aber Aufrufe an originale Methode durchleiten
    spyOn(rs, 'rateUp').and.callThrough();
    spyOn(rs, 'rateDown').and.callThrough();

    const book = { isbn: '123' } as Book;
    component.onRateUp(book);

    expect(rs.rateUp).toHaveBeenCalled();
    expect(rs.rateUp).toHaveBeenCalledTimes(1);
    expect(rs.rateUp).toHaveBeenCalledOnceWith(book);
    expect(rs.rateDown).not.toHaveBeenCalled();
  });
});
