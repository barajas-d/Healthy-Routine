import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserhomePage } from './userhome.page';

describe('UserhomePage', () => {
  let component: UserhomePage;
  let fixture: ComponentFixture<UserhomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserhomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserhomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
