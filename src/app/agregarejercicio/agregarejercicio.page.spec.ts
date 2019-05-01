import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarejercicioPage } from './agregarejercicio.page';

describe('AgregarejercicioPage', () => {
  let component: AgregarejercicioPage;
  let fixture: ComponentFixture<AgregarejercicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarejercicioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarejercicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
