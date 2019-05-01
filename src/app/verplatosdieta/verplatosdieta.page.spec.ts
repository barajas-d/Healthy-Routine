import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerplatosdietaPage } from './verplatosdieta.page';

describe('VerplatosdietaPage', () => {
  let component: VerplatosdietaPage;
  let fixture: ComponentFixture<VerplatosdietaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerplatosdietaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerplatosdietaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
