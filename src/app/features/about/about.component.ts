import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HomeLayoutComponent } from '../../shared/layouts/home-layout/home-layout.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, HomeLayoutComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
