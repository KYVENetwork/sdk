import { KyveRegistryLCDClient } from "./registry/v1beta1/query";
declare class KyveLCDClient {
    registry: {
        v1beta1: KyveRegistryLCDClient;
    };
    constructor(restEndpoint: string);
}
export declare type KyveLCDClientType = {
    kyve: KyveLCDClient;
};
export declare function createKyveLCDClient(restEndpoint: string): KyveLCDClientType;
export {};
