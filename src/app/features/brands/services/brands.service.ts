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
  private readonly controllerUrl = `${environment.apiUrl}/api/brands/get/all`;

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
