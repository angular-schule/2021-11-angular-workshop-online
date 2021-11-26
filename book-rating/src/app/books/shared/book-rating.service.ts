import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  MIN = 1;
  MAX = 5;

  constructor() { }

  rateUp(book: Book): Book {
    return {
      ...book,
      rating: book.rating < this.MAX ? book.rating + 1 : this.MAX,
    };
  }

  rateDown(book: Book): Book {
    return {
      ...book,
      rating: Math.max(book.rating - 1, this.MIN)
    };
  }
}

