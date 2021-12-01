import { Component } from '@angular/core';
import { ReplaySubject, throwError, of, EMPTY, retry, catchError, timer, map } from 'rxjs';

import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'rxw-error-handling',
  templateUrl: './error-handling.component.html',
})
export class ErrorHandlingComponent {

  logStream$ = new ReplaySubject<unknown>();

  constructor(private es: ExerciseService) { }

  /**
   * Das Observable aus `this.es.randomError()` liefert mit hoher Wahrscheinlichkeit einen Fehler.
   * Probiere verschiedene Strategien aus, um den Fehler zu behandeln:
   * - wiederholen
   * - Fehler weiterwerfen
   * - Fehler umwandeln (in ein normales Element)
   * - Fehler verschlucken/ignorieren
   */
  // TODO: Anfrage wiederholen
  start() {
    this.es.randomError().pipe(
      catchError(err => {
        // Fehler weiterwerfen / ersetzen
        return throwError(() => 'EIN FEHLER!');

        // Fehler ersetzen durch "normale Elemente"
        // return of('Nichts', 'passiert');

        // Fehler ignorieren / verschlucken
        // return EMPTY; // of() // from([]) // from(Promise.resolve()) // new Observable(obs => obs.complete())
      }),
      retry(3)
    ).subscribe({
      next: e => this.logStream$.next(e),
      error: err => this.logStream$.next('❌ ERROR: ' + err)
    });
  }
}
