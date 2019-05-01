import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerplatosdietauserPage } from './verplatosdietauser.page';

describe('VerplatosdietauserPage', () => {
  let component: VerplatosdietauserPage;
  let fixture: ComponentFixture<VerplatosdietauserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerplatosdietauserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerplatosdietauserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
