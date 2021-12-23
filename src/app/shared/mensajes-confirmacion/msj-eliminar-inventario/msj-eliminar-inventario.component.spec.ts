import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsjEliminarInventarioComponent } from './msj-eliminar-inventario.component';

describe('MsjEliminarInventarioComponent', () => {
  let component: MsjEliminarInventarioComponent;
  let fixture: ComponentFixture<MsjEliminarInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsjEliminarInventarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsjEliminarInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
