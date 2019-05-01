import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminosPage } from './terminos.page';

describe('TerminosPage', () => {
  let component: TerminosPage;
  let fixture: ComponentFixture<TerminosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
