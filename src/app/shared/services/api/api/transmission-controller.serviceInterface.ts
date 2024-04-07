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

import { CreateTransmissionRequest } from '../model/models';
<<<<<<< HEAD
import { CreateTransmissionResponse } from '../model/models';
import { GetAllTransmissionResponse } from '../model/models';
import { GetTransmissionByIdResponse } from '../model/models';
import { Update400Response } from '../model/models';
=======
import { CreatedTransmissionResponse } from '../model/models';
import { GetAllTransmissionResponse } from '../model/models';
import { GetTransmissionById400Response } from '../model/models';
import { GetTransmissionByIdResponse } from '../model/models';
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd
import { UpdateTransmissionRequest } from '../model/models';
import { UpdateTransmissionResponse } from '../model/models';


import { Configuration }                                     from '../configuration';


<<<<<<< HEAD
export interface DeleteRequestParams {
    id: number;
}

export interface AddRequestParams {
=======
export interface CreateTransmissionRequestParams {
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd
    createTransmissionRequest: CreateTransmissionRequest;
}

export interface GetTransmissionByIdRequestParams {
    id: number;
}

<<<<<<< HEAD
export interface UpdateRequestParams {
=======
export interface UpdateTransmissionByIdRequestParams {
    id: number;
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd
    updateTransmissionRequest: UpdateTransmissionRequest;
}


export interface TransmissionControllerServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * 
     * 
* @param requestParameters
     */
<<<<<<< HEAD
    _delete(requestParameters: DeleteRequestParams, extraHttpRequestParams?: any): Observable<{}>;

    /**
     * 
     * 
* @param requestParameters
     */
    add(requestParameters: AddRequestParams, extraHttpRequestParams?: any): Observable<CreateTransmissionResponse>;
=======
    createTransmission(requestParameters: CreateTransmissionRequestParams, extraHttpRequestParams?: any): Observable<CreatedTransmissionResponse>;
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd

    /**
     * 
     * 
*/
<<<<<<< HEAD
    getAll(extraHttpRequestParams?: any): Observable<Array<GetAllTransmissionResponse>>;
=======
    getAllTransmissions(extraHttpRequestParams?: any): Observable<Array<GetAllTransmissionResponse>>;
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd

    /**
     * 
     * 
* @param requestParameters
     */
    getTransmissionById(requestParameters: GetTransmissionByIdRequestParams, extraHttpRequestParams?: any): Observable<GetTransmissionByIdResponse>;

    /**
     * 
     * 
* @param requestParameters
     */
<<<<<<< HEAD
    update(requestParameters: UpdateRequestParams, extraHttpRequestParams?: any): Observable<UpdateTransmissionResponse>;
=======
    updateTransmissionById(requestParameters: UpdateTransmissionByIdRequestParams, extraHttpRequestParams?: any): Observable<UpdateTransmissionResponse>;
>>>>>>> a055835ee9b8b7dbcc6674a078e2feb94a320cfd

}