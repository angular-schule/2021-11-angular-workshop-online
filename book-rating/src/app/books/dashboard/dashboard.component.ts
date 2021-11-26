import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';


@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  minRating = this.rs.MIN;
  maxRating = this.rs.MAX;

  books: Book[]

  constructor(private rs: BookRatingService, private bs: BookStoreService) {
    this.books = [];

    this.bs.getAll().subscribe(books => {
      this.books = books;
    });
  }

  ngOnInit(): void {}

  trackBook(index: number, item: Book) {
    return index;
  }

  onRateUp(book: Book) {
    const ratedBook = this.rs.rateUp(book);
    this.updateList(ratedBook);
  }

  onRateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateList(ratedBook);
  }

  private updateList(ratedBook: Book) {
    this.books = this.books
      .map(book => book.isbn === ratedBook.isbn ? ratedBook : book);
  }

}

/*
class BookC {
  rating: number = 1;
  constructor(public isbn: string, public title: string) {}

  rateUp() {
    this.rating++;
  }
}

const myBookC = new BookC('123', 'Angular');
myBookC.rateUp();

///////////////////////////////////////

interface BookI {
  isbn: string;
  title: string;
  rating: number;
}

function rateUp(book: BookI): BookI {
  book.rating++;
  return book;
}

const myBook: BookI = {
  isbn: '123',
  title: '',
  rating: 4
};

rateUp(myBook);

*/
