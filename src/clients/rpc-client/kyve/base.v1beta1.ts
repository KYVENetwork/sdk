import {
  MsgClaimUploaderRole,
  MsgDefundPool,
  MsgDelegatePool,
  MsgFundPool,
  MsgStakePool,
  MsgSubmitBundleProposal,
  MsgUndelegatePool,
  MsgUnstakePool,
  MsgUpdateMetadata,
  MsgVoteProposal,
  MsgWithdrawPool,
} from "@kyve/proto/dist/proto/kyve/registry/v1beta1/tx";
import { coins } from "@cosmjs/stargate";
import { StdFee } from "@cosmjs/amino/build/signdoc";
import { withTypeUrl } from "../../../registry/tx.registry";
import { AccountData } from "@cosmjs/amino/build/signer";
import { BigNumber } from "bignumber.js";
import { KYVE_DECIMALS } from "../../../constants";
import { Client } from "../../../types/client";
import { DENOM } from "../../../constants";

export default class KyveBaseMsg {
  private nativeClient: Client;
  public readonly account: AccountData;

  constructor(client: Client, account: AccountData) {
    this.account = account;
    this.nativeClient = client;
  }

  public foundPool(
    value: Omit<MsgFundPool, "creator">,
    options?: {
      fee?: StdFee | "auto" | number,
      memo?: string
    }
  ) {
    const tx = withTypeUrl.fundPool({
      ...value,
      creator: this.account.address,
    });
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
        options?.fee ? options?.fee : "auto",
        options?.memo
    );
  }

  public defundPool(
    value: Omit<MsgDefundPool, "creator">,
    options?: {
      fee?: StdFee | "auto" | number,
      memo?: string
    }
  ) {
    const tx = withTypeUrl.defundPool({
      ...value,
      creator: this.account.address,
    });
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
        options?.fee ? options?.fee : "auto",
        options?.memo
    );
  }

  public stakePool(
    value: Omit<MsgStakePool, "creator">,
    options?: {
      fee?: StdFee | "auto" | number,
      memo?: string
    }
  ) {
    const tx = withTypeUrl.stakePool({
      ...value,
      creator: this.account.address,
    });
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
        options?.fee ? options?.fee : "auto",
      options?.memo
    );
  }

  public unstakePool(
    value: Omit<MsgUnstakePool, "creator">,
    options?: {
      fee?: StdFee | "auto" | number,
      memo?: string
    }
  ) {
    const tx = withTypeUrl.unstakePool({
      ...value,
      creator: this.account.address,
    });
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
        options?.fee ? options?.fee : "auto",
      options?.memo
    );
  }

  public delegatePool(
    value: Omit<MsgDelegatePool, "creator">,
    options?: {
      fee?: StdFee | "auto" | number,
      memo?: string
    }
  ) {
    const tx = withTypeUrl.delegatePool({
      ...value,
      creator: this.account.address,
    });
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
      options?.fee ? options?.fee : "auto",
      options?.memo
    );
  }

  public withdrawPool(
    value: Omit<MsgWithdrawPool, "creator">,
    options?: {
      fee?: StdFee | "auto" | number,
      memo?: string
    }
  ) {
    const tx = withTypeUrl.withdrawPool({
      ...value,
      creator: this.account.address,
    });
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
        options?.fee ? options?.fee : "auto",
      options?.memo
    );
  }

  public undelegatePool(
    value: Omit<MsgUndelegatePool, "creator">,
    options?: {
      fee?: StdFee | "auto" | number,
      memo?: string
    }
  ) {
    const tx = withTypeUrl.undelegatePool({
      ...value,
      creator: this.account.address,
    });
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
        options?.fee ? options?.fee : "auto",
      options?.memo
    );
  }

  public submitBundleProposal(
    value: Omit<MsgSubmitBundleProposal, "creator">,
    options?: {
      fee?: StdFee | "auto" | number,
      memo?: string
    }
  ) {
    const tx = withTypeUrl.submitBundleProposal({
      ...value,
      creator: this.account.address,
    });
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
        options?.fee ? options?.fee : "auto",
      options?.memo
    );
  }

  public voteProposal(
    value: Omit<MsgVoteProposal, "creator">,
    options?: {
      fee?: StdFee | "auto" | number,
      memo?: string
    }
  ) {
    const tx = withTypeUrl.voteProposal({
      ...value,
      creator: this.account.address,
    });
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
        options?.fee ? options?.fee : "auto",
      options?.memo
    );
  }

  public claimUploaderRole(
    value: Omit<MsgClaimUploaderRole, "creator">,
    options?: {
      fee?: StdFee | "auto" | number,
      memo?: string
    }
  ) {
    const tx = withTypeUrl.claimUploaderRole({
      ...value,
      creator: this.account.address,
    });
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
        options?.fee ? options?.fee : "auto",
        options?.memo
    );
  }

  public updateMetadata(
    value: Omit<MsgUpdateMetadata, "creator">,
    options?: {
      fee?: StdFee | "auto" | number,
      memo?: string
    }
  ) {
    const tx = withTypeUrl.updateMetadata({
      ...value,
      creator: this.account.address,
    });
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
        options?.fee ? options?.fee : "auto",
        options?.memo
    );
  }
  //todo test
  async transfer(
    recipient: string,
    amount: string,
    options?: {
      fee?: StdFee | "auto" | number,
      memo?: string
    }
  ) {
    const parsedAmount = new BigNumber(amount)
      .multipliedBy(new BigNumber(10).pow(KYVE_DECIMALS))
      .toNumber();

    return this.nativeClient.sendTokens(
      this.account.address,
      recipient,
      coins(parsedAmount, DENOM),
        options?.fee ? options?.fee : "auto",
      options?.memo
    );
  }

  async getKyveBalance() {
    const data = await this.nativeClient.getBalance(
        this.account.address,
        DENOM
    );
    return data.amount;
  }
}
