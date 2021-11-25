import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  constructor() { }

  rateUp(book: Book): Book {
    book.rating++;
    book.title = '';
    return book; // TODO
  }

  rateDown(book: Book): Book {
    return book; // TODO
  }
}
