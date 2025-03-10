import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { LoginComponent } from './pages/login/login.component';
import { loginGuard } from './guards/login.guard';

import { ProductosComponent } from './pages/productos/productos.component';
import { MascotasComponent } from './pages/mascotas/mascotas.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
    { path:'home', component:HomeComponent},
    { path:'productos', component:ProductosComponent},
    { path:'mascotas', component:MascotasComponent},
    { path: 'factura', component: FacturaComponent }, // ✅ Ruta de factura
   /** { path:'privado', component:PrivadoComponent , canActivate:[loginGuard] },
    { path:'estudiante', component:EstudianteComponent , /** canActivate:[loginGuard] },*/
    
    { path:'login', component:LoginComponent},

    {path:'',redirectTo:'home',pathMatch:'full'}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }