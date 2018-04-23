import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseClassComponent } from './base-class.component';

describe('BaseClassComponent', () => {
  let component: BaseClassComponent;
  let fixture: ComponentFixture<BaseClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
