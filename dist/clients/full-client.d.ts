import { OfflineDirectSigner } from "@cosmjs/proto-signing";
import KyveClient from "./rpc-client/client";
import KyveWebClient from "./rpc-client/web.client";
export declare function getSigningKyveClient(rpcEndpoint: string, signer: OfflineDirectSigner, walletName?: undefined, defaultTypes?: undefined): Promise<KyveClient>;
export declare function getSigningKyveClient(rpcEndpoint: string, signer: OfflineDirectSigner, walletName?: string, defaultTypes?: undefined): Promise<KyveWebClient>;
