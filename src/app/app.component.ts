
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

interface Taller {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  icono: string;
  color: string;
  horario: string;
  cupos: number;
  precio: number;
}

interface Inscripcion {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  taller: string;
  modalidad: string;
  fecha: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  talleres: Taller[] = [
    {
      id: 1,
      nombre: 'Desarrollo Web',
      categoria: 'PROGRAMACIÓN',
      descripcion: 'Crea páginas web modernas con HTML, CSS y JavaScript.',
      icono: '💻',
      color: 'violeta',
      horario: 'Lun. y Mié. · 4:00 p. m.',
      cupos: 20,
      precio: 80
    },
    {
      id: 2,
      nombre: 'Diseño UX/UI',
      categoria: 'DISEÑO DIGITAL',
      descripcion: 'Diseña experiencias digitales atractivas y fáciles de usar.',
      icono: '🎨',
      color: 'rosa',
      horario: 'Mar. y Jue. · 3:00 p. m.',
      cupos: 15,
      precio: 65
    },
    {
      id: 3,
      nombre: 'Inteligencia Artificial',
      categoria: 'TECNOLOGÍA',
      descripcion: 'Descubre las herramientas de IA y sus aplicaciones prácticas.',
      icono: '🤖',
      color: 'azul',
      horario: 'Vie. · 5:00 p. m.',
      cupos: 12,
      precio: 100
    },
    {
      id: 4,
      nombre: 'Ciberseguridad',
      categoria: 'SEGURIDAD',
      descripcion: 'Aprende buenas prácticas para proteger datos y sistemas.',
      icono: '🔐',
      color: 'verde',
      horario: 'Sáb. · 9:00 a. m.',
      cupos: 18,
      precio: 90
    }
  ];

  inscripciones: Inscripcion[] = [];

  formulario: Inscripcion = this.nuevaInscripcion();
  tallerSeleccionado = 0;
  mensaje = '';
  tipoMensaje: 'exito' | 'error' = 'exito';

  nuevaInscripcion(): Inscripcion {
    return {
      id: 0,
      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      taller: '',
      modalidad: 'Presencial',
      fecha: new Date().toISOString().slice(0, 10)
    };
  }

  get totalCupos(): number {
    return this.talleres.reduce((total, taller) => total + taller.cupos, 0);
  }

  seleccionarTaller(taller: Taller): void {
    if (taller.cupos <= 0) {
      this.notificar('Este taller ya no tiene cupos disponibles.', 'error');
      return;
    }

    this.tallerSeleccionado = taller.id;
    this.formulario.taller = taller.nombre;

    document.getElementById('inscripcion')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  registrar(form: NgForm): void {
    if (form.invalid) {
      this.notificar('Completa correctamente todos los campos obligatorios.', 'error');
      return;
    }

    const taller = this.talleres.find(
      t => t.nombre === this.formulario.taller
    );

    if (!taller) {
      this.notificar('Selecciona un taller antes de continuar.', 'error');
      return;
    }

    if (taller.cupos <= 0) {
      this.notificar('Lo sentimos, ya no quedan cupos en este taller.', 'error');
      return;
    }

    const correoExiste = this.inscripciones.some(
      i => i.correo.toLowerCase() === this.formulario.correo.trim().toLowerCase()
        && i.taller === taller.nombre
    );

    if (correoExiste) {
      this.notificar('Este correo ya está inscrito en ese taller.', 'error');
      return;
    }

    const nueva: Inscripcion = {
      ...this.formulario,
      id: Date.now(),
      nombre: this.formulario.nombre.trim(),
      apellido: this.formulario.apellido.trim(),
      correo: this.formulario.correo.trim().toLowerCase(),
      telefono: this.formulario.telefono.trim(),
      fecha: new Date().toISOString().slice(0, 10)
    };

    this.inscripciones.unshift(nueva);
    taller.cupos--;

    this.notificar('¡Inscripción registrada correctamente! 🎉', 'exito');

    this.formulario = this.nuevaInscripcion();
    this.tallerSeleccionado = 0;
    form.resetForm(this.formulario);
  }

  eliminarInscripcion(inscripcion: Inscripcion): void {
    const confirmar = window.confirm(
      `¿Deseas eliminar la inscripción de ${inscripcion.nombre} ${inscripcion.apellido}?`
    );

    if (!confirmar) return;

    const taller = this.talleres.find(t => t.nombre === inscripcion.taller);

    if (taller) taller.cupos++;

    this.inscripciones = this.inscripciones.filter(
      i => i.id !== inscripcion.id
    );

    this.notificar('Inscripción eliminada correctamente.', 'exito');
  }

  notificar(
    texto: string,
    tipo: 'exito' | 'error' = 'exito'
  ): void {
    this.mensaje = texto;
    this.tipoMensaje = tipo;
  }

  irA(id: string): void {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}