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


export interface UpdateCreditCardResponse { 
    id?: number;
    cardNumber?: string;
    cardHolderName?: string;
    expiryMonth?: number;
    expiryYear?: number;
    cvv?: string;
    balance?: number;
    isBlocked?: boolean;
    message?: string;
    createdDate?: string;
}

