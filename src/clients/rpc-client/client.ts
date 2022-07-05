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
    // const id = await this.nativeClient.getChainId()
    // console.log(id);
    /*const { accountNumber, sequence } = (await this.nativeClient.getSequence(this.account.address))!;
    const feeAmount = coins(2000, "tkyve");
    const gasLimit = 200000;
    this.signer.signDirect
    const authInfoBytes = makeAuthInfoBytes([{ pubkey, sequence }], feeAmount, gasLimit, sequence);
    */
    // const signDoc = makeSignDoc(new Uint8Array(Buffer.from(data, "utf-8")), new Uint8Array(), id, 0);

    // {
    //   "type": "cosmos-sdk/StdTx",
    //     "value": {
    //   "msg": [
    //     {
    //       "type": "sign/MsgSignData",
    //       "value": {
    //         "signer": "cosmos1hftz5ugqmpg9243xeegsqqav62f8hnywsjr4xr",
    //         "data": "cmFuZG9t"
    //       }
    //     }
    //   ],
    //       "fee": {
    //     "amount": [],
    //         "gas": "0"
    //   },
    //   "signatures": [
    //     {
    //       "pub_key": {
    //         "type": "tendermint/PubKeySecp256k1",
    //         "value": "AqnDSiRoFmTPfq97xxEb2VkQ/Hm28cPsqsZm9jEVsYK9"
    //       },
    //       "signature": "8y8i34qJakkjse9pOD2De+dnlc4KvFgh0wQpes4eydN66D9kv7cmCEouRrkka9tlW9cAkIL52ErB+6ye7X5aEg=="
    //     }
    //   ],
    //       "memo": ""
    // }
    // // }
    // draft to create sign transaction
    // const txBodyFields = {
    //   typeUrl: "/cosmos.tx.v1beta1.TxBody",
    //   value: {
    //     messages: [
    //       {
    //         typeUrl: "sign/MsgSignData",
    //         value: {
    //           "signer": "cosmos1hftz5ugqmpg9243xeegsqqav62f8hnywsjr4xr",
    //           "data": "cmFuZG9t"
    //         },
    //       },
    //     ],
    //   },
    // }
    // const registry = new Registry([...defaultRegistryTypes, ...KyveRegistryTx.registry]);
    // const txBodyBytes = registry.encode(txBodyFields);
    // const signDoc1 = makeSignDoc(txBodyBytes, authInfoBytes1, id, 0);
    // console.log(txBodyBytes);
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
