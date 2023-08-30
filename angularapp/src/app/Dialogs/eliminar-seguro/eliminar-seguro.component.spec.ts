import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarSeguroComponent } from './eliminar-seguro.component';

describe('EliminarSeguroComponent', () => {
  let component: EliminarSeguroComponent;
  let fixture: ComponentFixture<EliminarSeguroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarSeguroComponent]
    });
    fixture = TestBed.createComponent(EliminarSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
