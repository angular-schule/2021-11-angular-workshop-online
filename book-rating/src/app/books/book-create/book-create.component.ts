import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

  bookForm: FormGroup;

  constructor(private bs: BookStoreService, private router: Router) {
    this.bookForm = new FormGroup({
      isbn: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13)
      ]),
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      price: new FormControl(0, [
        Validators.min(0),
        Validators.max(1000),
      ]),
      rating: new FormControl(1, [
        Validators.min(1),
        Validators.max(5),
      ])
    });
  }

  ngOnInit(): void {
  }

  isInvalid(controlName: string): boolean {
    const control = this.bookForm.get(controlName);
    return !!control && control.touched && control.invalid;
    // return (control?.touched && control?.invalid) || false;
  }

  hasError(controlName: string, errorCode: string): boolean {
    const control = this.bookForm.get(controlName);
    return !!control && control.hasError(errorCode) && control.touched;
  }

  submitForm() {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    this.bs.create(this.bookForm.value).subscribe(book => {
      this.router.navigate(['/books', book.isbn]); // [routerLink]=['/books', book.isbn]
      // this.router.navigateByUrl('/books'); // routerLink="/books"
    });
  }

}

/*
TODO:
- Validierung ☑️
- Hinweismeldungen  ☑️
- Submit-Button
- Abschicken
- HTTP
- bei Erfolg: Redirect zur Detailseite
*/
