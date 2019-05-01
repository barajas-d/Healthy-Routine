import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutricionadminPage } from './nutricionadmin.page';

describe('NutricionadminPage', () => {
  let component: NutricionadminPage;
  let fixture: ComponentFixture<NutricionadminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutricionadminPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutricionadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
