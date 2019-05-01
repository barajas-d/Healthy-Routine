import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutricionPage } from './nutricion.page';

describe('NutricionPage', () => {
  let component: NutricionPage;
  let fixture: ComponentFixture<NutricionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutricionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutricionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
