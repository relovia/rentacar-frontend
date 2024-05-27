import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HomeLayoutComponent } from '../../../shared/layouts/home-layout/home-layout.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, HomeLayoutComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {}
