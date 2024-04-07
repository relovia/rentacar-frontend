import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  MenuComponent,
  MenuItem,
} from '../../../../shared/components/menu/menu.component';
<<<<<<< HEAD
import { BrandsListBaseComponent } from '../brands-list-base/brands-list-base.component';
=======
// import { BrandListItemDto } from '../../models/brand-list-item-dto';
import { BrandsListBaseComponent } from '../brands-list-base/brands-list-base.component';
// import { BrandsService } from '../../services/brands.service';
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd

@Component({
  selector: 'app-brands-list-menu',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './brands-list-menu.component.html',
  styleUrl: './brands-list-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // OnPush ile değişikliklerin kontrolü optimize edilir.
})
export class BrandsListMenuComponent
  extends BrandsListBaseComponent
  implements OnInit
{
<<<<<<< HEAD
=======
  // override ngOnInit(): void {
  //   console.log('BrandsListMenuComponent');
  //   super.ngOnInit();
  // }

>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd
  get brandsMenuItems(): MenuItem[] {
    return (
      this.brands?.map((brand) => {
        return {
<<<<<<< HEAD
          label: brand.name!,
=======
          label: brand.name!, // ! : null olmayan bir değer olduğunu belirtir.
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd
          click: (_: MouseEvent) => this.onSelectBrand(brand),
        };
      }) ?? []
    );
  }
}
