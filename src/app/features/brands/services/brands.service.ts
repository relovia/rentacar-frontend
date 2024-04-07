import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  GetAllBrandResponse,
  GetBrandByIdRequestParams,
  GetBrandByIdResponse,
} from '../../../shared/services/api';

@Injectable({
  providedIn: 'root',
}) // Singleton
export class BrandsService {
<<<<<<< HEAD
  private readonly controllerUrl = `${environment.apiUrl}/api/brands/get/all`;
=======
  private readonly controllerUrl = `${environment.apiUrl}/api/v1/brands`;
  // data = [
  //   { id: 1, name: 'Toyota' },
  //   { id: 2, name: 'Ford' },
  //   { id: 3, name: 'Chevrolet' },
  //   { id: 4, name: 'Nissan' },
  //   { id: 5, name: 'Honda' },
  //   { id: 6, name: 'Jeep' },
  //   { id: 7, name: 'Hyundai' },
  //   { id: 8, name: 'Dodge' },
  //   { id: 9, name: 'Kia' },
  //   { id: 10, name: 'GMC' },
  // ];
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd

  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<GetAllBrandResponse[]> {
    return this.httpClient.get<GetAllBrandResponse[]>(this.controllerUrl);
  }

  getBrandById(
    request: GetBrandByIdRequestParams
  ): Observable<GetBrandByIdResponse> {
    return this.httpClient.get<GetBrandByIdResponse>(
      `${this.controllerUrl}/${request.id}`
    );
  }
}
