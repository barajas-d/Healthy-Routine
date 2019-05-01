import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EjercicioadminPage } from './ejercicioadmin.page';

describe('EjercicioadminPage', () => {
  let component: EjercicioadminPage;
  let fixture: ComponentFixture<EjercicioadminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EjercicioadminPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EjercicioadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
