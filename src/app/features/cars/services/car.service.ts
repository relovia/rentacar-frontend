import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateCarRequest,
  CreateCarResponse,
  GetAllCarResponse,
  GetCarByIdResponse,
  UpdateCarRequest,
  UpdateCarResponse,
} from '../../../shared/services/api';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private readonly controllerUrl = `${environment.apiUrl}/api/cars`;

  constructor(private http: HttpClient) {}

  addCar(createCarRequest: CreateCarRequest): Observable<CreateCarResponse> {
    return this.http.post<CreateCarResponse>(
      `${this.controllerUrl}/add`,
      createCarRequest
    );
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete(`${this.controllerUrl}/delete/${id}`);
  }

  getAllCars(): Observable<GetAllCarResponse[]> {
    return this.http.get<GetAllCarResponse[]>(`${this.controllerUrl}/get/all`);
  }

  getCarById(id: number): Observable<GetCarByIdResponse> {
    return this.http.get<GetCarByIdResponse>(`${this.controllerUrl}/get/${id}`);
  }

  updateCar(updateCarRequest: UpdateCarRequest): Observable<UpdateCarResponse> {
    return this.http.put<UpdateCarResponse>(
      `${this.controllerUrl}/update`,
      updateCarRequest
    );
  }
}
