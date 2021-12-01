import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, Observable, switchMap } from 'rxjs';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  searchControl = new FormControl('');

  books$: Observable<Book[]>;

  constructor(private bs: BookStoreService) {
    const valueChanges$: Observable<string> = this.searchControl.valueChanges;

    this.books$ = valueChanges$.pipe(
      debounceTime(1000),
      filter(term => term.length >= 3 || term.length === 0),
      switchMap(term => this.bs.search(term))
    );
  }

  /* Typeahead-Suche
  - Suchbegriff mindestens 3 Zeichen lang (mit RxJS lösen!)
  - nicht zu viele Begriffe kurz nacheinander abschicken
  - Bücher auf dem Server suchen (HTTP)
  - Ergebnisse anzeigen (ganz einfach)
  - (AsyncPipe)
  */

  ngOnInit(): void {
  }

}
