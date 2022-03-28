import {
  coins,
  DeliverTxResponse,
  SigningStargateClient,
} from "@cosmjs/stargate";
import axios from "axios";
import { BigNumber } from "bignumber.js";
import {
  KYVE_DECIMALS,
  KYVE_DEFAULT_FEE,
  KYVE_ENDPOINTS,
} from "./utils/constants";
import {
  CreatePoolProposal,
  createRegistry,
  TextProposal,
  UpdatePoolProposal,
} from "./utils/registry";
import { KyveWallet } from "./wallet";
import { sha256 } from "@cosmjs/crypto";
import { fromBase64, toHex } from "@cosmjs/encoding";
import { bech32 } from "bech32";
import { decodeTxRaw } from "@cosmjs/proto-signing";
import { FullDecodedTransaction } from "./types/transactions";
import { MessageEvent } from "./types/events";
import { cosmos, verifyADR36Amino } from "@keplr-wallet/cosmos";
import { StdSignature } from "@cosmjs/launchpad/build/types";
import { pubkeyToAddress } from "@cosmjs/amino/build/addresses";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import Long from "long";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";

export { KYVE_DECIMALS } from "./utils/constants";
export { KyveWallet } from "./wallet";

interface PoolResponse {
  // TODO: Properly type this out ...
  Pool: any;
}

export class KyveSDK {
  private client?: SigningStargateClient;

  constructor(private readonly wallet: KyveWallet) {}

  async getClient(): Promise<SigningStargateClient> {
    if (!this.client) {
      this.client = await SigningStargateClient.connectWithSigner(
        KYVE_ENDPOINTS[this.wallet.network].rpc,
        await this.wallet.getSigner(),
        { registry: await createRegistry() }
      );
    }

    return this.client;
  }

  async fetchPoolState(id: number): Promise<any> {
    const { data } = await axios.get<PoolResponse>(
      `${
        KYVE_ENDPOINTS[this.wallet.network].rest
      }/kyve/registry/v1beta1/pool/${id}`
    );
    return data.Pool;
  }

  async fund(
    id: number | string,
    amount: BigNumber,
    fee = KYVE_DEFAULT_FEE
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/kyve.registry.v1beta1.MsgFundPool",
      value: {
        creator,
        id,
        amount: amount.toString(),
      },
    };

    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async defund(
    id: number | string,
    amount: BigNumber,
    fee = KYVE_DEFAULT_FEE
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/kyve.registry.v1beta1.MsgDefundPool",
      value: {
        creator,
        id,
        amount: amount.toString(),
      },
    };

    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async stake(
    id: number | string,
    amount: BigNumber,
    fee = KYVE_DEFAULT_FEE
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/kyve.registry.v1beta1.MsgStakePool",
      value: {
        creator,
        id,
        amount: amount.toString(),
      },
    };

    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async unstake(
    id: number | string,
    amount: BigNumber,
    fee = KYVE_DEFAULT_FEE
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/kyve.registry.v1beta1.MsgUnstakePool",
      value: {
        creator,
        id,
        amount: amount.toString(),
      },
    };

    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async delegate(
    id: number | string,
    staker: string,
    amount: BigNumber,
    fee = KYVE_DEFAULT_FEE
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/kyve.registry.v1beta1.MsgDelegatePool",
      value: {
        creator,
        id,
        staker,
        amount: amount.toString(),
      },
    };

    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async undelegate(
    id: number | string,
    staker: string,
    amount: BigNumber,
    fee = KYVE_DEFAULT_FEE
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/kyve.registry.v1beta1.MsgUndelegatePool",
      value: {
        creator,
        id,
        staker,
        amount: amount.toString(),
      },
    };

    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async withdrawRewards(
    id: number | string,
    staker: string,
    fee = KYVE_DEFAULT_FEE
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/kyve.registry.v1beta1.MsgWithdrawPool",
      value: {
        creator,
        id,
        staker,
      },
    };

    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async updateCommission(
    id: number | string,
    commission: string,
    fee = KYVE_DEFAULT_FEE
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/kyve.registry.v1beta1.MsgUpdateCommission",
      value: {
        creator,
        id,
        commission,
      },
    };

    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async govSubmitProposal(
    type: "TextProposal" | "CreatePoolProposal" | "UpdatePoolProposal",
    content: Object,
    amount: BigNumber,
    fee = KYVE_DEFAULT_FEE
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    let typeUrl: string;
    let encodedContent: Uint8Array;
    switch (type) {
      case "TextProposal":
        typeUrl = "/cosmos.gov.v1beta1.TextProposal";
        encodedContent = TextProposal.encode(content).finish();
        break;
      case "CreatePoolProposal":
        typeUrl = "/kyve.registry.v1beta1.CreatePoolProposal";
        encodedContent = CreatePoolProposal.encode(content).finish();
        break;
      case "UpdatePoolProposal":
        typeUrl = "/kyve.registry.v1beta1.UpdatePoolProposal";
        encodedContent = UpdatePoolProposal.encode(content).finish();
        break;
    }

    const msg = {
      typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
      value: {
        content: {
          typeUrl,
          value: encodedContent,
        },
        initialDeposit: coins(amount.toString(), "tkyve"),
        proposer: creator,
      },
    };

    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async govDeposit(
    id: string,
    amount: BigNumber,
    fee = KYVE_DEFAULT_FEE
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/cosmos.gov.v1beta1.MsgDeposit",
      value: {
        proposalId: Long.fromString(id),
        depositor: creator,
        amount: coins(amount.toString(), "tkyve"),
      },
    };

    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async govVote(
    id: string,
    option: "Yes" | "Abstain" | "No" | "NoWithVeto",
    fee = KYVE_DEFAULT_FEE
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    let _option = cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_UNSPECIFIED;
    switch (option) {
      case "Yes":
        _option = cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_YES;
        break;
      case "Abstain":
        _option = cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_ABSTAIN;
        break;
      case "No":
        _option = cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_NO;
        break;
      case "NoWithVeto":
        _option = cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_NO_WITH_VETO;
        break;
    }

    const msg = {
      typeUrl: "/cosmos.gov.v1beta1.MsgVote",
      value: {
        proposalId: Long.fromString(id),
        voter: creator,
        option: _option,
      },
    };

    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async submitBundleProposal(
    id: number | string,
    bundleId: string,
    byteSize: number,
    bundleSize: number,
    fee = KYVE_DEFAULT_FEE
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/kyve.registry.v1beta1.MsgSubmitBundleProposal",
      value: {
        creator,
        id,
        bundleId,
        byteSize,
        bundleSize,
      },
    };

    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async voteProposal(
    id: number | string,
    bundleId: string,
    support: boolean,
    fee = KYVE_DEFAULT_FEE
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/kyve.registry.v1beta1.MsgVoteProposal",
      value: {
        creator,
        id,
        bundleId,
        support,
      },
    };

    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async claimUploaderRole(
    id: number | string,
    fee = KYVE_DEFAULT_FEE
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/kyve.registry.v1beta1.MsgClaimUploaderRole",
      value: {
        creator,
        id,
      },
    };

    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async transfer(
    recipient: string,
    amount: number,
    fee = KYVE_DEFAULT_FEE
  ): Promise<string> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const parsedAmount = new BigNumber(amount)
      .multipliedBy(new BigNumber(10).pow(KYVE_DECIMALS))
      .toNumber();

    const tx = await client.sendTokens(
      creator,
      recipient,
      coins(parsedAmount, "tkyve"),
      fee
    );
    return tx.transactionHash;
  }

  async getMessageEventLogs(
    fromBlock: number,
    toBlock: number
  ): Promise<MessageEvent[]> {
    const client = this.client ?? (await this.getClient());

    const tendermint = await Tendermint34Client.connect(
      KYVE_ENDPOINTS[this.wallet.network].rpc
    );

    const events = [];

    for (let i = fromBlock; i <= toBlock; i++) {
      const block = await client.getBlock(i);
      let blockResult;
      try {
        blockResult = await tendermint.blockResults(i);
      } catch (e) {
        events.push(
          new MessageEvent(
            [
              { key: "action", value: "ParsingError" },
              { key: "stacktrace", value: JSON.stringify(e) },
            ],
            new Date(block.header.time),
            block.header.height
          )
        );
      }

      // Iterate transaction headers
      for (const encodedTransaction of block.txs) {
        // Calculate tx hash
        const id = toHex(sha256(encodedTransaction));

        const fullDecodedTransaction = new FullDecodedTransaction();

        // Fetch full transaction
        const indexedTx = await client.getTx(id);

        if (indexedTx != null) {
          fullDecodedTransaction.indexedTx = indexedTx;

          fullDecodedTransaction.blockTime = new Date(block.header.time);
          fullDecodedTransaction.blockNumber = block.header.height;

          const decodedRaw = decodeTxRaw(indexedTx.tx);
          fullDecodedTransaction.messages = [];

          for (const msg of decodedRaw.body.messages) {
            if (msg.typeUrl.startsWith("/kyve")) {
              fullDecodedTransaction.messages.push({
                typeUrl: msg.typeUrl,
                value: client.registry.decode({
                  typeUrl: msg.typeUrl,
                  value: msg.value,
                }),
              });
            }
          }

          fullDecodedTransaction.events = [];
          // Extract event logs

          try {
            const rawEventsArrays = [];

            for (const eventWrapper of JSON.parse(indexedTx.rawLog)) {
              for (const event of eventWrapper.events) {
                rawEventsArrays.push(event);
              }
            }

            for (const ev of rawEventsArrays) {
              if (ev.type == "message") {
                const kyveEvent = ev.attributes.filter(
                  (value: { key: string }) => value.key == "EventName"
                ).length;

                if (kyveEvent == 0) {
                  events.push(
                    new MessageEvent(
                      ev.attributes,
                      fullDecodedTransaction.blockTime!,
                      fullDecodedTransaction.blockNumber!
                    )
                  );
                  fullDecodedTransaction.events.push(ev.attributes);
                } else {
                  // First two entries are sender and action
                  let tx_sender = ev.attributes.find(
                    (value: any) => value.key == "sender"
                  ) ?? { key: "sender", value: "" };
                  let tx_action = ev.attributes.find(
                    (value: any) => value.key == "action"
                  ) ?? { key: "sender", value: "" };

                  let singleEventArray = [tx_sender, tx_action];

                  for (const attr of ev.attributes.reverse()) {
                    singleEventArray.push(attr);
                    if (attr.key == "EventName") {
                      if (singleEventArray.length > 2) {
                        events.push(
                          new MessageEvent(
                            singleEventArray,
                            fullDecodedTransaction.blockTime!,
                            fullDecodedTransaction.blockNumber!
                          )
                        );
                        fullDecodedTransaction.events.push(singleEventArray);
                      }
                      singleEventArray = [tx_sender, tx_action];
                    }
                  }
                }
              }
            }
          } catch (e) {}
        }
      }

      // Iterate EndBlockEvents
      if (blockResult != undefined) {
        const eventsArray = blockResult.endBlockEvents.find(
          (value) => value.type == "message"
        );
        if (eventsArray != undefined) {
          const decoder = new TextDecoder();

          const decodedEvents = [];
          for (const ev of eventsArray.attributes) {
            decodedEvents.push({
              key: decoder.decode(ev.key),
              value: decoder.decode(ev.value),
            });
          }

          if (
            decodedEvents.find((value) => value.key == "module") &&
            decodedEvents.find((value) => value.key == "action")
          ) {
            events.push(
              new MessageEvent(
                decodedEvents,
                new Date(block.header.time),
                blockResult.height
              )
            );
          }
        }
      }
    }

    return events;
  }

  isValidAddress(address: string): boolean {
    try {
      bech32.decode(address);
      return true;
    } catch {}
    return false;
  }

  async signString(message: string): Promise<StdSignature> {
    if (window.keplr) {
      return window?.keplr.signArbitrary(
        `kyve-${this.wallet.network}`,
        await this.wallet.getAddress(),
        message
      );
    }
    throw new Error("Keplr wallet not installed.");
  }

  async verifyString(
    signature: string,
    data: string,
    pubKey: string
  ): Promise<boolean> {
    return verifyADR36Amino(
      "kyve",
      this.getAddressFromPubKey(pubKey),
      new TextEncoder().encode(data),
      fromBase64(pubKey),
      fromBase64(signature)
    );
  }

  getAddressFromPubKey(pubKey: string) {
    return pubkeyToAddress(
      { type: "tendermint/PubKeySecp256k1", value: pubKey },
      "kyve"
    );
  }
}
