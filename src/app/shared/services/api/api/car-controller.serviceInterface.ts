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
import { HttpHeaders }                                       from '@angular/common/http';

import { Observable }                                        from 'rxjs';

import { CreateCarRequest } from '../model/models';
<<<<<<< HEAD
import { CreateCarResponse } from '../model/models';
import { GetAllCarResponse } from '../model/models';
import { GetCarByIdResponse } from '../model/models';
import { Update400Response } from '../model/models';
=======
import { CreatedCarResponse } from '../model/models';
import { GetAllCarResponse } from '../model/models';
import { GetCarByIdResponse } from '../model/models';
import { GetTransmissionById400Response } from '../model/models';
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd
import { UpdateCarRequest } from '../model/models';
import { UpdateCarResponse } from '../model/models';


import { Configuration }                                     from '../configuration';


<<<<<<< HEAD
export interface Add3RequestParams {
    createCarRequest: CreateCarRequest;
}

export interface Delete3RequestParams {
    id: number;
}

=======
export interface CreateCarRequestParams {
    createCarRequest: CreateCarRequest;
}

>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd
export interface GetCarByIdRequestParams {
    id: number;
}

<<<<<<< HEAD
export interface Update3RequestParams {
=======
export interface UpdateCarByIdRequestParams {
    id: number;
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd
    updateCarRequest: UpdateCarRequest;
}


export interface CarControllerServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * 
     * 
* @param requestParameters
     */
<<<<<<< HEAD
    add3(requestParameters: Add3RequestParams, extraHttpRequestParams?: any): Observable<CreateCarResponse>;

    /**
     * 
     * 
* @param requestParameters
     */
    delete3(requestParameters: Delete3RequestParams, extraHttpRequestParams?: any): Observable<{}>;
=======
    createCar(requestParameters: CreateCarRequestParams, extraHttpRequestParams?: any): Observable<CreatedCarResponse>;
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd

    /**
     * 
     * 
*/
<<<<<<< HEAD
    getAll3(extraHttpRequestParams?: any): Observable<Array<GetAllCarResponse>>;
=======
    getAllCars(extraHttpRequestParams?: any): Observable<Array<GetAllCarResponse>>;
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd

    /**
     * 
     * 
* @param requestParameters
     */
    getCarById(requestParameters: GetCarByIdRequestParams, extraHttpRequestParams?: any): Observable<GetCarByIdResponse>;

    /**
     * 
     * 
* @param requestParameters
     */
<<<<<<< HEAD
    update3(requestParameters: Update3RequestParams, extraHttpRequestParams?: any): Observable<UpdateCarResponse>;
=======
    updateCarById(requestParameters: UpdateCarByIdRequestParams, extraHttpRequestParams?: any): Observable<UpdateCarResponse>;
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd

}