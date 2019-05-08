import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisdietasPage } from './misdietas.page';

describe('MisdietasPage', () => {
  let component: MisdietasPage;
  let fixture: ComponentFixture<MisdietasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisdietasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisdietasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
