import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Question4Component } from './question-4.component';

describe('Question4Component', () => {
  let component: Question4Component;
  let fixture: ComponentFixture<Question4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Question4Component]
    });
    fixture = TestBed.createComponent(Question4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
