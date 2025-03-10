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
  videos = [
    { src: 'https://videos.pexels.com/video-files/2849936/2849936-uhd_2560_1440_24fps.mp4', alt: 'Perro feliz' },
    { src: 'https://videos.pexels.com/video-files/854982/854982-hd_1280_720_25fps.mp4', alt: 'Gato jugando' },
    { src: 'https://videos.pexels.com/video-files/6662773/6662773-hd_1280_720_60fps.mp4', alt: 'Conejo tierno' }
  ];

  
}
