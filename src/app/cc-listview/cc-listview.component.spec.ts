/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CcListviewComponent } from './cc-listview.component';

describe('CcListviewComponent', () => {
  let component: CcListviewComponent;
  let fixture: ComponentFixture<CcListviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcListviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcListviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
