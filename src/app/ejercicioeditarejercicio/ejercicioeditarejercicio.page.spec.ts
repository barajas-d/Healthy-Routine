import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EjercicioeditarejercicioPage } from './ejercicioeditarejercicio.page';

describe('EjercicioeditarejercicioPage', () => {
  let component: EjercicioeditarejercicioPage;
  let fixture: ComponentFixture<EjercicioeditarejercicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EjercicioeditarejercicioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EjercicioeditarejercicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
