// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { environment } from '../../../../environments/environment';
// import {
//   GetAllBrandResponse,
//   GetBrandByIdRequestParams,
//   GetBrandByIdResponse,
// } from '../../../shared/services/api';

// @Injectable({
//   providedIn: 'root',
// }) // Singleton
// export class BrandsService {
//   private readonly controllerUrl = `${environment.apiUrl}/api/brands/`;

//   constructor(private httpClient: HttpClient) {}

//   getAllBrands(): Observable<GetAllBrandResponse[]> {
//     return this.httpClient.get<GetAllBrandResponse[]>(
//       `${this.controllerUrl}/get/all`
//     );
//   }

//   getBrandById(
//     request: GetBrandByIdRequestParams
//   ): Observable<GetBrandByIdResponse> {
//     return this.httpClient.get<GetBrandByIdResponse>(
//       `${this.controllerUrl}/${request.id}`
//     );
//   }
// }
