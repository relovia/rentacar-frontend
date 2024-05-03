import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  MenuComponent,
  MenuItem,
} from '../../../../shared/components/menu/menu.component';
import { TransmissionsListBaseComponent } from '../transmissions-list-base/transmissions-list-base.component';

@Component({
  selector: 'app-transmissions-list-menu',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: 'transmissions-list-menu.component.html',
  styleUrl: './transmissions-list-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush ile değişikliklerin kontrolü optimize edilir.
})
export class TransmissionsListMenuComponent
  extends TransmissionsListBaseComponent
  implements OnInit
{
  get transmissionsMenuItems(): MenuItem[] {
    return (
      this.transmissions?.map((transmission) => {
        return {
          label: transmission.name!,
          click: (_: MouseEvent) => this.onSelectTransmission(transmission),
        };
      }) ?? []
    );
  }
}
