import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private API_FIRE_PRODUCTOS = 'https://app-fire-7da97-default-rtdb.firebaseio.com/productos';
  private API_FIRE_MASCOTAS = 'https://app-fire-7da97-default-rtdb.firebaseio.com/mascotas';

  constructor(private http: HttpClient) {}

  // 📌 CRUD para Productos
  postProductos(producto: any): Observable<any> {
    return this.http.post(`${this.API_FIRE_PRODUCTOS}.json`, producto);
  }
  getProductos(): Observable<any> {
    return this.http.get(`${this.API_FIRE_PRODUCTOS}.json`);
  }
  deleteProducto(id: string): Observable<any> {
    return this.http.delete(`${this.API_FIRE_PRODUCTOS}/${id}.json`);
  }
  updateProducto(id: string, producto: any): Observable<any> {
    return this.http.put(`${this.API_FIRE_PRODUCTOS}/${id}.json`, producto);

  }
  

  // 📌 CRUD para Mascotas
  postMascota(mascota: any): Observable<any> {
    return this.http.post(`${this.API_FIRE_MASCOTAS}.json`, mascota);
  }
  getMascotas(): Observable<any> {
    return this.http.get(`${this.API_FIRE_MASCOTAS}.json`);
  }
  deleteMascota(id: string): Observable<any> {
    return this.http.delete(`${this.API_FIRE_MASCOTAS}/${id}.json`);
  }
  updateMascota(id: string, mascota: any): Observable<any> {
    return this.http.put(`${this.API_FIRE_MASCOTAS}/${id}.json`, mascota);
  }
}
