import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear la app', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el mensaje cuando no hay inscripciones', () => {
    const texto = fixture.nativeElement.textContent;
    expect(texto).toContain('Todavía no hay participantes registrados.');
  });

  it('debería calcular los indicadores por turno', () => {
    component.inscripciones = [
      { numero: 1, nombre: 'Ana', correo: 'ana@correo.com', especialidad: 'Redes', turno: 'Mañana', modalidad: 'Virtual', nivel: 'Avanzado' },
      { numero: 2, nombre: 'Luis', correo: 'luis@correo.com', especialidad: 'Desarrollo', turno: 'Noche', modalidad: 'Presencial', nivel: 'Principiante' },
      { numero: 3, nombre: 'Eva', correo: 'eva@correo.com', especialidad: 'Inteligencia Artificial', turno: 'Noche', modalidad: 'Virtual', nivel: 'Intermedio' },
    ];
    expect(component.totalInscritos).toBe(3);
    expect(component.totalManana).toBe(1);
    expect(component.totalNoche).toBe(2);
  });

  it('debería eliminar una inscripción por número', () => {
    component.inscripciones = [
      { numero: 1, nombre: 'Ana', correo: 'ana@correo.com', especialidad: 'Redes', turno: 'Mañana', modalidad: 'Virtual', nivel: 'Avanzado' },
    ];
    component.eliminar(1);
    expect(component.inscripciones.length).toBe(0);
  });
});
