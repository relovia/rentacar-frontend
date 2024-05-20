import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  MenuComponent,
  MenuItem,
} from '../../../../shared/components/menu/menu.component';
import { FuelsListBaseComponent } from '../fuels-list-base/fuels-list-base.component';

@Component({
  selector: 'app-fuels-list-menu',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: 'fuels-list-menu.component.html',
  styleUrl: './fuels-list-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush ile değişikliklerin kontrolü optimize edilir.
})
export class FuelsListMenuComponent
  extends FuelsListBaseComponent
  implements OnInit
{
  get fuelsMenuItems(): MenuItem[] {
    return (
      this.fuels?.map((fuel) => {
        return {
          label: fuel.name!,
          click: (_: MouseEvent) => this.onSelectFuel(fuel),
        };
      }) ?? []
    );
  }
}
