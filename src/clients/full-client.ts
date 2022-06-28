import {
  defaultRegistryTypes,
  GasPrice,
  SigningStargateClient,
} from "@cosmjs/stargate";
import { OfflineSigner, Registry } from "@cosmjs/proto-signing";
import * as KyveRegistryTx from "../registry/tx.registry";
import KyveClient from "./rpc-client/client";
import KyveWebClient from "./rpc-client/web.client";

export async function getSigningKyveClient(
  rpcEndpoint: string,
  signer: OfflineSigner,
  walletName?: undefined,
  defaultTypes?: undefined
): Promise<KyveClient>;

export async function getSigningKyveClient(
  rpcEndpoint: string,
  signer: OfflineSigner,
  walletName?: string,
  defaultTypes?: undefined
): Promise<KyveWebClient>;

export async function getSigningKyveClient(
  rpcEndpoint: string,
  signer: OfflineSigner,
  walletName?: string,
  defaultTypes = defaultRegistryTypes
): Promise<KyveWebClient | KyveClient> {
  const registry = new Registry([...defaultTypes, ...KyveRegistryTx.registry]);
  const gasPrice = GasPrice.fromString("0tkyve");
  const client: SigningStargateClient =
    await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
      registry,
      gasPrice,
    });
  const [account] = await signer.getAccounts();
  if (typeof walletName === "string")
    return new KyveWebClient(client, account, walletName);
  return new KyveClient(client, account);
}
