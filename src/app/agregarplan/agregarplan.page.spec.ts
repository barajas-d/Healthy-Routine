import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarplanPage } from './agregarplan.page';

describe('AgregarplanPage', () => {
  let component: AgregarplanPage;
  let fixture: ComponentFixture<AgregarplanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarplanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarplanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
