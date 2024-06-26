import {Component, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-simple-web-component',
  templateUrl: './simple-web-component.component.html',
  styleUrls: ['./simple-web-component.component.css']
})
export class SimpleWebComponentComponent implements OnDestroy {
  count = Math.floor(Math.random() * 1000);

  constructor() {
    console.log('i am SimpleWebComponentComponent');
  }

  ngOnDestroy() {
    console.log('component destroyed');
  }
}
