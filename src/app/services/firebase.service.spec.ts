import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private API_FIRE = 'https://app-fire-7da97-default-rtdb.firebaseio.com/productos';

  constructor(private http: HttpClient) {}

  // ✅ Agregar un producto
  postProductos(producto: any): Observable<any> {
    return this.http.post(`${this.API_FIRE}.json`, producto);
  }

  // ✅ Obtener todos los productos
  getProductos(): Observable<any> {
    return this.http.get(`${this.API_FIRE}.json`);
  }

  // ✅ Eliminar un producto
  deleteProducto(id: string): Observable<any> {
    return this.http.delete(`${this.API_FIRE}/${id}.json`);
  }

  // ✅ Actualizar un producto
  updateProducto(id: string, producto: any): Observable<any> {
    return this.http.put(`${this.API_FIRE}/${id}.json`, producto);
  }
}
