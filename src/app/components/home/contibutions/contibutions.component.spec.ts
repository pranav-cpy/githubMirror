import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContibutionsComponent } from './contibutions.component';

describe('ContibutionsComponent', () => {
  let component: ContibutionsComponent;
  let fixture: ComponentFixture<ContibutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContibutionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContibutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
