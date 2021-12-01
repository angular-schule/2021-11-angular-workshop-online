import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, take, delayWhen } from 'rxjs';

@Component({
  selector: 'rxw-creating',
  templateUrl: './creating.component.html',
})
export class CreatingComponent {

  logStream$ = new ReplaySubject<string | number>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/

    // of('A', 'B', 'C')
    // from([1,2,3,4,5])
    // interval(1000)
    // timer (1000)
    // timer (1000, 2000)

    timer(2000, 500).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0)
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    });

    // mögliche Implementierung von of()
    function myOf(...values: string[]) {
      return new Observable(obs => {
        values.forEach(v => {
          obs.next(v);
        });
        obs.complete();
      });
    }



    /******************************/


    function producer(o: any) {
      o.next(Math.random());
      o.next(4);
      o.next(3);

      setTimeout(() => {
        o.next(2);
      }, 1000);

      setTimeout(() => {
        o.error('fehler');
        o.next(2);
      }, 2000);
    }

    const observer = {
      next: (e: any) => console.log(e),
      error: (e: any) => console.error(e),
      complete: () => console.log('COMPLETE')
    };

    const myObs$ = new Observable(producer);

    myObs$.subscribe(observer);
    myObs$.subscribe();
    myObs$.subscribe(e => console.log(e));
    // producer(observer);

    // so KÖNNTE ein Observable implementiert werden
    /*class MyObservable {
      constructor(private producer: any) {}

      subscribe(observer) {
        const subscriber = this.sanitizeObserver(observer);
        this.producer(subscriber);
      }
    }*/


    /******************************/
  }

  private log(msg: string | number) {
    this.logStream$.next(msg);
  }

}
