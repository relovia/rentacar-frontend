import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() imageSrc?: string;
  @Input() imgAlt?: string;
  @Input() title!: string;
  @Input() text!: string;
  @Input() buttonLabel!: string;
  @Output() buttonClick = new EventEmitter();
}
