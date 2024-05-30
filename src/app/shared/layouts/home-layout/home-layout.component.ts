import { Component } from '@angular/core';
import {
  NavbarComponent,
  NavItem,
  NavTitle,
} from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterModule, CommonModule],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss',
})
export class HomeLayoutComponent {
  constructor(private authService: AuthService) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }

  navTitle: NavTitle = { text: 'Rent A Car', routerLink: '/' };
  navItems: NavItem[] = [
    { label: 'Home', link: '/' },
    { label: 'About', link: '/about' },
    { label: 'Customers', link: '/customers' },
    { label: 'Contact', link: '/contact' },
  ];

  managementNavItems: NavItem[] = [
    { label: 'Brands Management', link: '/management/brands' },
    { label: 'Cars Management', link: '/management/cars' },
    { label: 'Models Management', link: '/management/models' },
    { label: 'Transmissions Management', link: '/management/transmissions' },
    { label: 'Fuels Management', link: '/management/fuels' },
  ];
}
