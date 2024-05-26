/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { CreateRentalRequest } from '../model/models';
import { CreateRentalResponse } from '../model/models';
import { GetAllRentalResponse } from '../model/models';
import { GetRentalByIdResponse } from '../model/models';
import { UpdateRentalRequest } from '../model/models';
import { UpdateRentalResponse } from '../model/models';
import { UpdateUser400Response } from '../model/models';

import { Configuration } from '../configuration';

export interface CreateRentalRequestParams {
  createRentalRequest: CreateRentalRequest;
}

export interface DeleteRentalRequestParams {
  id: number;
}

export interface GetRentalByIdRequestParams {
  id: number;
}

export interface UpdateRentalRequestParams {
  updateRentalRequest: UpdateRentalRequest;
}

export interface RentalControllerServiceInterface {
  defaultHeaders: HttpHeaders;
  configuration: Configuration;

  /**
   *
   *
   * @param requestParameters
   */
  createRental(
    requestParameters: CreateRentalRequestParams,
    extraHttpRequestParams?: any
  ): Observable<CreateRentalResponse>;

  /**
   *
   *
   * @param requestParameters
   */
  deleteRental(
    requestParameters: DeleteRentalRequestParams,
    extraHttpRequestParams?: any
  ): Observable<{}>;

  /**
   *
   *
   */
  getAllRentals(
    extraHttpRequestParams?: any
  ): Observable<Array<GetAllRentalResponse>>;

  /**
   *
   *
   * @param requestParameters
   */
  getRentalById(
    requestParameters: GetRentalByIdRequestParams,
    extraHttpRequestParams?: any
  ): Observable<GetRentalByIdResponse>;

  /**
   *
   *
   * @param requestParameters
   */
  updateRental(
    requestParameters: UpdateRentalRequestParams,
    extraHttpRequestParams?: any
  ): Observable<UpdateRentalResponse>;
}
