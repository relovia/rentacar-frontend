import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appTable]',
  standalone: true,
})
export class TableDirective implements OnInit {
  // Directive Angular tarafında bir elementin özelliklerini genişletmek veya düzenlemek için kullanılır.

  constructor(private elementRef: ElementRef) {} // ElementRef: Directive'i uyguladığımız elementin referansını alır.

  ngOnInit(): void {
<<<<<<< HEAD
    // elementRef.nativeElement: Directive'i uyguladığımız elementin referansını alır.
    (this.elementRef.nativeElement as HTMLTableElement).classList.add('table');
=======
    (this.elementRef.nativeElement as HTMLTableElement).classList.add('table'); // elementRef.nativeElement: Directive'i uyguladığımız elementin referansını alır.
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd
  }
}
