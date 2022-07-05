import KyveClient from "./client";
import { AccountData } from "@cosmjs/amino/build/signer";
import { SigningStargateClient } from "@cosmjs/stargate";
import { OfflineDirectSigner } from "@cosmjs/proto-signing";
export default class KyveWebClient extends KyveClient {
    private readonly walletName;
    constructor(client: SigningStargateClient, account: AccountData, signer: OfflineDirectSigner, walletName: string);
    getWalletName(): string;
}
