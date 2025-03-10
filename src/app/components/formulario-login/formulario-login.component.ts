import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { console } from 'inspector';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './formulario-login.component.html',
  styleUrl: './formulario-login.component.css'
})
export class FormularioLoginComponent {

  constructor(private servicio: LoginService , private router: Router) {}

  email:any;
  password:any;

  login(formulario:any){
    //console.log(formulario.value);
    this.servicio.postLogin(formulario.value).subscribe(acceso=>{
      //console.log(acceso);
      let token=acceso.accessToken
      if(token!=''){
      localStorage.setItem("login","true")
      this.router.navigate(['privado'])
    }
    
    })
  }

}