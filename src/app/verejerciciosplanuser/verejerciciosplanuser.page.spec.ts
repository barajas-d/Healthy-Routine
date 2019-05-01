import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerejerciciosplanuserPage } from './verejerciciosplanuser.page';

describe('VerejerciciosplanuserPage', () => {
  let component: VerejerciciosplanuserPage;
  let fixture: ComponentFixture<VerejerciciosplanuserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerejerciciosplanuserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerejerciciosplanuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
