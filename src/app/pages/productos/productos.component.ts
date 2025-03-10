import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { CarritoService } from '../../services/carrito.service'; // Servicio para carrito
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  constructor(private servicio: FirebaseService, private carritoService: CarritoService) {}

  nombre: string = '';
  categoria: string = '';
  precio: number = 0; 
  productos: any[] = [];
  idEditar: string | null = null;

  guardar(formulario: any) {
    this.obtenerProximoID().then((nuevoID) => {
      const nuevoProducto = {
        id: nuevoID,
        nombre: this.nombre,
        categoria: this.obtenerNombreCategoria(this.categoria),
        precio: this.precio
      };

      this.servicio.postProductos(nuevoProducto).subscribe(() => {
        this.obtenerProductos();
        formulario.reset();
      });
    });
  }

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.servicio.getProductos().subscribe((data) => {
      if (data) {
        this.productos = Object.entries(data).map(([key, value]: any) => ({ idFirebase: key, ...value }));
      } else {
        this.productos = [];
      }
    });
  }

  async obtenerProximoID(): Promise<string> {
    return new Promise((resolve) => {
      this.servicio.getProductos().subscribe((data) => {
        if (data) {
          const ids = Object.values(data).map((p: any) => parseInt(p.id.replace('ID', '')) || 0);
          const maxID = ids.length ? Math.max(...ids) : 0;
          resolve(`ID${String(maxID + 1).padStart(2, '0')}`);
        } else {
          resolve('ID01');
        }
      });
    });
  }

  eliminarProducto(idFirebase: string) {
    this.servicio.deleteProducto(idFirebase).subscribe(() => {
      this.obtenerProductos();
    });
  }

  editarProducto(producto: any) {
    this.idEditar = producto.idFirebase;
    this.nombre = producto.nombre;
    this.categoria = producto.categoria;
    this.precio = producto.precio;
  }

  actualizarProducto(formulario: any) {
    if (!this.idEditar) return;

    const productoActualizado = {
      id: this.idEditar,
      nombre: this.nombre,
      categoria: this.obtenerNombreCategoria(this.categoria),
      precio: this.precio
    };

    this.servicio.updateProducto(this.idEditar, productoActualizado).subscribe(() => {
      this.obtenerProductos();
      formulario.reset();
      this.idEditar = null;
    });
  }

  obtenerNombreCategoria(codigo: string): string {
    const categorias: { [key: string]: string } = {
      Juguetes: 'Juguetes',
      Alimentos: 'Alimentos',
      Servicios: 'Servicios'
    };
    return categorias[codigo] || codigo;
  }

  // Agregar producto al carrito
  agregarAlCarrito(producto: any) {
    this.carritoService.agregarProducto(producto);
  }
}
