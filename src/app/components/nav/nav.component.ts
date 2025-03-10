import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  autenticacion():boolean{
    if(typeof window!=='undefined'&& window.localStorage){
    return localStorage.getItem('login')==='false';
  }
return false;
}
unautenticacion():boolean{
  if(typeof window!=='undefined'&& window.localStorage){
  return localStorage.getItem('login')==='true';
}
return false;
}
constructor(private route:Router){}
logout(){
  localStorage.setItem("login", "false")
  this.route.navigate(['login'])
}
}