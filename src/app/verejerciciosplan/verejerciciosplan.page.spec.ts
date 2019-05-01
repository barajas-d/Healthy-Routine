import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerejerciciosplanPage } from './verejerciciosplan.page';

describe('VerejerciciosplanPage', () => {
  let component: VerejerciciosplanPage;
  let fixture: ComponentFixture<VerejerciciosplanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerejerciciosplanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerejerciciosplanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
