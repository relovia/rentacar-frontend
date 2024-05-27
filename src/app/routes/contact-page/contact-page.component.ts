import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContactComponent } from '../../features/contact/components/contact.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, ContactComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
})
export class ContactPageComponent {}
