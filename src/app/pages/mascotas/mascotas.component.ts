import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.css'
})
export class MascotasComponent {
  constructor(private servicio: FirebaseService) {}

  nombre: string = '';
  raza: string = '';
  tipo: string = '';
  edad: number | null = null;
  peso: number | null = null;
  mascotas: any[] = [];
  idEditar: string | null = null;

  guardar(formulario: any) {
    this.obtenerProximoID().then((nuevoID) => {
      const nuevaMascota = {
        id: nuevoID, 
        nombre: this.nombre,
        raza: this.raza,
        tipo: this.tipo,
        edad: this.edad,
        peso: this.peso
      };

      this.servicio.postMascota(nuevaMascota).subscribe(() => {
        this.obtenerMascotas();
        formulario.reset();
      });
    });
  }

  ngOnInit() {
    this.obtenerMascotas();
  }

  obtenerMascotas() {
    this.servicio.getMascotas().subscribe((data) => {
      if (data) {
        this.mascotas = Object.entries(data).map(([key, value]: any) => ({ idFirebase: key, ...value }));
      } else {
        this.mascotas = [];
      }
    });
  }

  async obtenerProximoID(): Promise<string> {
    return new Promise((resolve) => {
      this.servicio.getMascotas().subscribe((data) => {
        if (data) {
          const ids = Object.values(data).map((m: any) => parseInt(m.id.replace('M', '')) || 0);
          const maxID = ids.length ? Math.max(...ids) : 0;
          resolve(`M${String(maxID + 1).padStart(2, '0')}`);
        } else {
          resolve('M01');
        }
      });
    });
  }

  eliminarMascota(idFirebase: string) {
    this.servicio.deleteMascota(idFirebase).subscribe(() => {
      this.obtenerMascotas();
    });
  }

  editarMascota(mascota: any) {
    this.idEditar = mascota.idFirebase;
    this.nombre = mascota.nombre;
    this.raza = mascota.raza;
    this.tipo = mascota.tipo;
    this.edad = mascota.edad;
    this.peso = mascota.peso;
  }

  actualizarMascota(formulario: any) {
    if (!this.idEditar) return;

    const mascotaActualizada = {
      id: this.idEditar,
      nombre: this.nombre,
      raza: this.raza,
      tipo: this.tipo,
      edad: this.edad,
      peso: this.peso
    };

    this.servicio.updateMascota(this.idEditar, mascotaActualizada).subscribe(() => {
      this.obtenerMascotas();
      formulario.reset();
      this.idEditar = null;
    });
  }
}
