export class Customer {
    constructor(private id: number) {}

    fooBar(foo: number): string {   
        console.log('IDX', this.id);
        
        setTimeout(() => {
            console.log('ID', this.id);
        }, 2000);

        return '';
    }
}