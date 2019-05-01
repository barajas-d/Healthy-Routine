import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EjercicioeditarplanPage } from './ejercicioeditarplan.page';

describe('EjercicioeditarplanPage', () => {
  let component: EjercicioeditarplanPage;
  let fixture: ComponentFixture<EjercicioeditarplanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EjercicioeditarplanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EjercicioeditarplanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
