import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

// export interface NavItemInterface {
//   label: string;
// }
// export type NavItem = NavItemInterface;

export type NavItem = {
  label: string;
  link: string;
};

export type NavTitle =
  | {
      text: string;
      routerLink?: string | string[];
    }
  | undefined;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, //ngFor
    RouterModule, //routerLink
    ButtonComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() title: NavTitle;
  @Input() navItems: NavItem[] = [];
  @Input() managementNavItems: NavItem[] = [];
  @Input() endContentTemplate?: TemplateRef<any>;

  isUrl(url: string): boolean {
    return (
      url.startsWith('http') ||
      url.startsWith('https') ||
      url.startsWith('mailto') ||
      url.startsWith('tel')
    );
    const urlRegex = new RegExp(
      /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/
    );
    return urlRegex.test(url);
  }
}
