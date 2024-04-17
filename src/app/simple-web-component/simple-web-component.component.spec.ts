import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleWebComponentComponent } from './simple-web-component.component';

describe('SimpleWebComponentComponent', () => {
  let component: SimpleWebComponentComponent;
  let fixture: ComponentFixture<SimpleWebComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleWebComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleWebComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
