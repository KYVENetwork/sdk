import {
  KYVE_COSMOSTATION_CONFIG,
  KYVE_DECIMALS,
  KYVE_ENDPOINTS,
  KYVE_KEPLR_CONFIG,
  KYVE_NETWORK,
  Network,
  PREFIX,
  SUPPORTED_WALLETS,
} from "./constants";
import { getSigningKyveClient } from "./clients/full-client";
import {
  DirectSecp256k1HdWallet,
  DirectSecp256k1Wallet,
} from "@cosmjs/proto-signing";
import {
  RequestAccountResponse,
  SignOptions,
} from "@cosmostation/extension-client/types/message";
import { cosmostationMethods, CosmostationSigner } from "./cosmostation-helper";
import { createKyveLCDClient } from "./clients/lcd-client/client";
import { BigNumber } from "bignumber.js";
// @ts-ignore
import humanize from "humanize-number";
import KyveWebClient from "./clients/rpc-client/web.client";
import KyveClient from "./clients/rpc-client/client";
import { fromHex } from "@cosmjs/encoding";

/** Class representing a KyveSDK. */
export class KyveSDK {
  public readonly network: Network;
  private walletSupports: Set<keyof typeof SUPPORTED_WALLETS>;

  /**
   * Create sdk instance.
   * @param network - The network type, e.g mainnet, testnet, etc
   */
  constructor(network: KYVE_NETWORK | Network) {
    this.walletSupports = new Set<keyof typeof SUPPORTED_WALLETS>();
    if (typeof network === "string") {
      this.network = KYVE_ENDPOINTS[network];
    } else {
      this.network = network;
    }
  }

  /**
   * Create a client from mnemonic
   * @param mnemonic
   * @return Promise<KyveClient>
   */
  async fromMnemonic(mnemonic: string): Promise<KyveClient> {
    //DirectSecp256k1HdWallet
    const signedClient = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: PREFIX,
    });
    return getSigningKyveClient(this.network.rpc, signedClient);
  }

  /**
   * create a client from private key
   * @param privateKey - hex privateKey
   * @return Promise<KyveClient>
   */
  async fromPrivateKey(privateKey: string): Promise<KyveClient> {
    const signedClient = await DirectSecp256k1Wallet.fromKey(
      fromHex(privateKey.startsWith("0x") ? privateKey.slice(2) : privateKey),
      PREFIX
    );
    return getSigningKyveClient(this.network.rpc, signedClient);
  }

  /**
   * Crate a client from Keplr wallet if installed
   * @return Promise<KyveWebClient>
   */
  async fromKeplr(): Promise<KyveWebClient> {
    if (typeof window === "undefined") throw new Error("Unsupported.");
    if (!window.keplr) throw new Error("Please install Keplr.");
    await window.keplr.experimentalSuggestChain({
      ...KYVE_KEPLR_CONFIG,
      rpc: this.network.rpc,
      rest: this.network.rest,
      chainId: this.network.chainId,
      chainName: this.network.chainName,
    });

    await window.keplr.enable(this.network.chainId);
    const signer = window.keplr.getOfflineSigner(this.network.chainId);
    const walletName = (await window.keplr.getKey(this.network.chainId)).name;
    const client = await getSigningKyveClient(
      this.network.rpc,
      signer,
      walletName
    );
    this.walletSupports.add(SUPPORTED_WALLETS.KEPLER);
    return client;
  }

  /**
   * Crate a client from Cosmostaion wallet if installed
   * @return Promise<KyveWebClient>
   */
  async fromCosmostation(config?: SignOptions): Promise<KyveWebClient> {
    if (typeof window === "undefined") throw new Error("Unsupported.");
    if (!window.cosmostation) throw new Error("Please install cosmostation.");
    const chain = await cosmostationMethods.getSupportedChains();
    let cosmostationAccount: RequestAccountResponse;
    if (
      chain.unofficial.includes(this.network.chainName.toLowerCase().trim())
    ) {
      cosmostationAccount = await cosmostationMethods.requestAccount(
        this.network.chainName
      );
    } else {
      await cosmostationMethods.addChain({
        ...KYVE_COSMOSTATION_CONFIG,
        restURL: this.network.rest,
        chainId: this.network.chainId,
        chainName: this.network.chainName,
      });
      cosmostationAccount = await cosmostationMethods.requestAccount(
        this.network.chainName
      );
    }
    const cosmostationSigner = new CosmostationSigner(
      cosmostationAccount,
      this.network,
      config ? config : {}
    );
    const client = await getSigningKyveClient(
      this.network.rpc,
      cosmostationSigner,
      cosmostationAccount.name
    );
    this.walletSupports.add(SUPPORTED_WALLETS.COSMOSTATION);
    return client;
  }

  /**
   * Listener to detect if account in wallet changed, support fromKeplr and fromCosmostation  instances
   * @param cb
   */
  async onAccountChange(cb: () => void) {
    if (this.walletSupports.has(SUPPORTED_WALLETS.COSMOSTATION))
      return window.cosmostation.tendermint.on("accountChanged", cb);
    if (this.walletSupports.has(SUPPORTED_WALLETS.KEPLER))
      return window.addEventListener("keplr_keystorechange", cb);
    throw new Error("Need to initiate from wallet");
  }

  /**
   * create LCD client to get data from Rest api
   */
  createLCDClient() {
    return createKyveLCDClient(this.network.rest);
  }

  /**
   * generate KyveClient instance without mnemonic
   */
  async generate() {
    const signer = await DirectSecp256k1HdWallet.generate(24, {
      prefix: PREFIX,
    });
    return getSigningKyveClient(this.network.rpc, signer);
  }

  formatBalance(balance: string, decimals: number = 2): string {
    return humanize(
      new BigNumber(balance)
        .dividedBy(new BigNumber(10).exponentiatedBy(KYVE_DECIMALS))
        .toFixed(decimals)
    );
  }
}
