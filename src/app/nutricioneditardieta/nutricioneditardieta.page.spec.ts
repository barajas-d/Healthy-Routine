import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutricioneditardietaPage } from './nutricioneditardieta.page';

describe('NutricioneditardietaPage', () => {
  let component: NutricioneditardietaPage;
  let fixture: ComponentFixture<NutricioneditardietaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutricioneditardietaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutricioneditardietaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
