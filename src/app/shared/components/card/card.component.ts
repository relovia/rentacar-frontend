import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() imageSrc?: string;
  @Input() imgAlt?: string;
  @Input() title!: string;
  @Input() text!: string;
  @Input() buttonLabel!: string;
  @Input() brandName!: string;
  @Input() fuelName!: string;
  @Input() transmissionName!: string;
  @Input() dailyPrice?: number;
  @Input() model!: any;
  @Output() buttonClick = new EventEmitter();
}
