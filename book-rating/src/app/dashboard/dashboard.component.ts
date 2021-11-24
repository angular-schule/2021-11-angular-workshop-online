import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';


@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];

  constructor() {
    this.books = [
      {
        isbn: '111',
        title: 'Angular',
        description: 'Grundlagen und mehr',
        rating: 5,
        price: 36.9
      },
      {
        isbn: '222',
        title: 'Vue.js',
        description: 'Das grüne Framework',
        rating: 3,
        price: 32.9
      }
    ];
  }

  ngOnInit(): void {
  }

  trackBook(index: number, item: Book) {
    return index;
  }

}

/*
class BookC implements BookI {
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
