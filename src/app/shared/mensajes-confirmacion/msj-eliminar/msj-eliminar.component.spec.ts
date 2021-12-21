import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsjEliminarComponent } from './msj-eliminar.component';

describe('MsjEliminarComponent', () => {
  let component: MsjEliminarComponent;
  let fixture: ComponentFixture<MsjEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsjEliminarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsjEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
