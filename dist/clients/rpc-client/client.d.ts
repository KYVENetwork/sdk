import { AccountData } from "@cosmjs/amino/build/signer";
import KyveBaseMethods from "./kyve/base.v1beta1";
import KyveGovMethods from "./kyve/gov.v1beta1";
import { SigningStargateClient } from "@cosmjs/stargate";
import { OfflineDirectSigner } from "@cosmjs/proto-signing";
export default class KyveClient {
    nativeClient: SigningStargateClient;
    readonly account: AccountData;
    signer: OfflineDirectSigner;
    kyve: {
        v1beta1: {
            base: KyveBaseMethods;
            gov: KyveGovMethods;
        };
    };
    constructor(client: SigningStargateClient, account: AccountData, signer: OfflineDirectSigner);
    signString(data: string): Promise<import("@cosmjs/proto-signing").DirectSignResponse>;
    verifyString(signature: string, data: string, pubKey: Uint8Array): Promise<boolean>;
}
