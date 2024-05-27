import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AboutComponent } from '../../features/about/about.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, AboutComponent],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
})
export class AboutPageComponent {}
