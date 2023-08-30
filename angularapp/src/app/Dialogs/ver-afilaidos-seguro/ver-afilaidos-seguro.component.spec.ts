import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAfilaidosSeguroComponent } from './ver-afilaidos-seguro.component';

describe('VerAfilaidosSeguroComponent', () => {
  let component: VerAfilaidosSeguroComponent;
  let fixture: ComponentFixture<VerAfilaidosSeguroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerAfilaidosSeguroComponent]
    });
    fixture = TestBed.createComponent(VerAfilaidosSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
