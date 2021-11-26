import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Book } from '../shared/book';

import { BookComponent } from './book.component';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    // DOM: fixture.nativeElement.querySelector('button');

    component.book = {
      isbn: '',
      title: '',
      description: '',
      rating: 3,
      price: 4
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event for onRateUp()', () => {
    // Arrange
    let emittedBook: Book | undefined;

    component.rateUp.subscribe(book => {
      emittedBook = book;
    });

    // Act
    component.onRateUp();

    // Assert (bitte nicht so viele! ;-) )
    expect(emittedBook).toBeTruthy();
    expect(emittedBook).toBeDefined();
    expect(emittedBook).not.toBeUndefined();

    expect(emittedBook).toBe(component.book);
  });

  it('(2) should emit event for onRateUp()', (done) => {
    // Arrange
    component.rateUp.subscribe(book => {
      expect(book).toBe(component.book!);
      done(); // Achtung: Verzögert den Test, wenn callback nciht ausgeführt wird!
    });

    // Act
    component.onRateUp();


  });
});
