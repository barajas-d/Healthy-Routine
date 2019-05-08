import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoinicioPage } from './tutoinicio.page';

describe('TutoinicioPage', () => {
  let component: TutoinicioPage;
  let fixture: ComponentFixture<TutoinicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutoinicioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutoinicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
