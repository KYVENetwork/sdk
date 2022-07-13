import { cosmos } from "@keplr-wallet/cosmos";
import { EncodeObject } from "@cosmjs/proto-signing";
import TxRaw = cosmos.tx.v1beta1.TxRaw;
import { toHex } from "@cosmjs/encoding";
import { sha256 } from "@cosmjs/crypto";
import {calculateFee, coins, SigningStargateClient} from "@cosmjs/stargate";
import { StdFee } from "@cosmjs/amino/build/signdoc";

export class TxPromise {
  private nativeClient: SigningStargateClient;
  private txBytes: Uint8Array;
  readonly txHash: string;
  constructor(nativeClient: SigningStargateClient, txBytes: Uint8Array) {
    this.nativeClient = nativeClient;
    this.txBytes = txBytes;
    this.txHash = toHex(sha256(this.txBytes)).toUpperCase();
  }
  async execute() {
    return await this.nativeClient.broadcastTx(this.txBytes);
  }
}
async function calcFee(gasEstimation: number, fee: "auto" | number) {
  const multiplier = typeof fee === "number" ? fee : 1.5;
  return calculateFee(Math.round(gasEstimation * multiplier), "5000000tkyve");
}

export async function signTx(
  nativeClient: SigningStargateClient,
  address: string,
  tx: EncodeObject,
  options?: {
    fee?: StdFee | "auto" | number;
    memo?: string;
  }
) {
  if (!options || options.fee == undefined) {
    const gasEstimation = await nativeClient.simulate(address, [tx], undefined);
    const fee = await calcFee(gasEstimation, "auto");
    const txRaw = await nativeClient.sign(
      address,
      [tx],
      fee,
      options?.memo ? options?.memo : ""
    );
    return TxRaw.encode(txRaw).finish();
  } else if (options.fee === "auto" || typeof options.fee == "number") {
    const gasEstimation = await nativeClient.simulate(
      address,
      [tx],
      options?.memo
    );
    const fee = await calcFee(gasEstimation, options.fee);
    const txRaw = await nativeClient.sign(
      address,
      [tx],
      fee,
      options?.memo ? options?.memo : ""
    );
    return TxRaw.encode(txRaw).finish();
  } else {
    const txRaw = await nativeClient.sign(
      address,
      [tx],
      options.fee,
      options?.memo ? options?.memo : ""
    );
    return TxRaw.encode(txRaw).finish();
  }
}
