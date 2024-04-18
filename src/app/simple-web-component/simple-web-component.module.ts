import {NgModule, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SimpleWebComponentComponent} from './simple-web-component.component';

@NgModule({
  declarations: [
    SimpleWebComponentComponent
  ],
  exports: [
    SimpleWebComponentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SimpleWebComponentModule implements OnDestroy {
  ngOnDestroy() {
    console.log('SimpleWebComponentModule destroyed');
  }
}
