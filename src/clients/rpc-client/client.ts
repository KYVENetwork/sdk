import { AccountData } from "@cosmjs/amino/build/signer";
import KyveBaseMethods from "./kyve/base.v1beta1";
import KyveGovMethods from "./kyve/gov.v1beta1";
import { SigningStargateClient } from "@cosmjs/stargate";
import {makeSignBytes, makeSignDoc, OfflineDirectSigner, OfflineSigner} from "@cosmjs/proto-signing";
import {Secp256k1, Secp256k1Signature, sha256} from "@cosmjs/crypto";
import {fromBase64} from "@cosmjs/encoding";

export default class KyveClient {
  public nativeClient: SigningStargateClient;
  public readonly account: AccountData;
  public signer: OfflineDirectSigner
  public kyve: { v1beta1: { base: KyveBaseMethods; gov: KyveGovMethods } };

  constructor(client: SigningStargateClient, account: AccountData, signer: OfflineDirectSigner) {
    this.account = account;
    this.nativeClient = client;
    this.kyve = {
      v1beta1: {
        base: new KyveBaseMethods(this.nativeClient, this.account),
        gov: new KyveGovMethods(this.nativeClient, this.account),
      },
    };
    this.signer = signer
  }

  async signString(data: string) {
    const signDoc = makeSignDoc(new Uint8Array(Buffer.from(data, "utf-8")), new Uint8Array(), await this.nativeClient.getChainId(), 0);
    return this.signer.signDirect(this.account.address, signDoc)
  }
  async verifyString(signature: string, data: string, pubKey: Uint8Array) {
    const signDoc = makeSignDoc(new Uint8Array(Buffer.from(data, "utf-8")), new Uint8Array(), "", 0);
    const signBytes = makeSignBytes(signDoc)
    const hashedMessage = sha256(signBytes);
    const sig = Secp256k1Signature.fromFixedLength(fromBase64(signature))
    return Secp256k1.verifySignature(sig, hashedMessage, pubKey)
  }
}
