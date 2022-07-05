import KyveClient from "./client";
import { AccountData } from "@cosmjs/amino/build/signer";
import { SigningStargateClient } from "@cosmjs/stargate";
import {OfflineDirectSigner, OfflineSigner} from "@cosmjs/proto-signing";

export default class KyveWebClient extends KyveClient {
  private readonly walletName: string;
  constructor(
      client: SigningStargateClient,
      account: AccountData,
      signer: OfflineDirectSigner,
      walletName: string,
  ) {
    super(client, account, signer);
    this.walletName = walletName;
  }

  public getWalletName() {
    return this.walletName;
  }
}
