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

import { CreateModelRequest } from '../model/models';
import { CreateModelResponse } from '../model/models';
import { GetAllModelResponse } from '../model/models';
import { GetModelByIdResponse } from '../model/models';
import { Update400Response } from '../model/models';
import { UpdateModelRequest } from '../model/models';
import { UpdateModelResponse } from '../model/models';

import { Configuration } from '../configuration';

export interface Add1RequestParams {
  createModelRequest: CreateModelRequest;
}

export interface Delete1RequestParams {
  id: number;
}

export interface GetModelByIdRequestParams {
  id: number;
}

export interface Update1RequestParams {
  updateModelRequest: UpdateModelRequest;
}

export interface ModelControllerServiceInterface {
  defaultHeaders: HttpHeaders;
  configuration: Configuration;

  /**
   *
   *
   * @param requestParameters
   */
  add1(
    requestParameters: Add1RequestParams,
    extraHttpRequestParams?: any
  ): Observable<CreateModelResponse>;

  /**
   *
   *
   * @param requestParameters
   */
  delete1(
    requestParameters: Delete1RequestParams,
    extraHttpRequestParams?: any
  ): Observable<{}>;

  /**
   *
   *
   */
  getAll1(extraHttpRequestParams?: any): Observable<Array<GetAllModelResponse>>;

  /**
   *
   *
   * @param requestParameters
   */
  getModelById(
    requestParameters: GetModelByIdRequestParams,
    extraHttpRequestParams?: any
  ): Observable<GetModelByIdResponse>;

  /**
   *
   *
   * @param requestParameters
   */
  update1(
    requestParameters: Update1RequestParams,
    extraHttpRequestParams?: any
  ): Observable<UpdateModelResponse>;
}
