import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  imagenes = [
    { src: 'https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_1280.jpg', alt: 'Perro feliz' },
    { src: 'https://cdn.pixabay.com/photo/2015/11/17/13/13/bulldog-1047518_640.jpg', alt: 'Gato curioso' },
    { src: 'https://cdn.pixabay.com/photo/2016/02/26/16/32/bulldog-1224267_640.jpg', alt: 'Conejo adorable' }
  ];

}
