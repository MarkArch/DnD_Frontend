import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sheet',
  template: '<pdf-viewer id="viewer" [src]="pdfSrc"></pdf-viewer>',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent implements OnInit {

  constructor() { }
  pdfSrc = '../assets/img/pdf/CharSheet5e.pdf';

  ngOnInit() {
  }

}
