import { Registry } from "@cosmjs/proto-signing";
import { defaultRegistryTypes } from "@cosmjs/stargate";
import path from "path";
import { load } from "protobufjs";

export const createRegistry = async (): Promise<Registry> => {
  const root = await load(path.join(__dirname, "../proto/tx.proto"));

  return new Registry(
    Array.from([
      ...defaultRegistryTypes,
      [
        `/kyve.registry.v1beta1.MsgCreatePool`,
        root.lookupType("MsgCreatePool"),
      ],
      [`/kyve.registry.v1beta1.MsgFundPool`, root.lookupType("MsgFundPool")],
      [
        `/kyve.registry.v1beta1.MsgDefundPool`,
        root.lookupType("MsgDefundPool"),
      ],
      [`/kyve.registry.v1beta1.MsgStakePool`, root.lookupType("MsgStakePool")],
      [
        `/kyve.registry.v1beta1.MsgUnstakePool`,
        root.lookupType("MsgUnstakePool"),
      ],
      [
        `/kyve.registry.v1beta1.MsgClaimUploaderRole`,
        root.lookupType("MsgClaimUploaderRole"),
      ],
      [
        `/kyve.registry.v1beta1.MsgSubmitBundleProposal`,
        root.lookupType("MsgSubmitBundleProposal"),
      ],
      [
        `/kyve.registry.v1beta1.MsgVoteProposal`,
        root.lookupType("MsgVoteProposal"),
      ],
      [
        `/kyve.registry.v1beta1.MsgDelegatePool`,
        root.lookupType("MsgDelegatePool"),
      ],
      [
        `/kyve.registry.v1beta1.MsgUndelegatePool`,
        root.lookupType("MsgUndelegatePool"),
      ],
      [
        `/kyve.registry.v1beta1.MsgWithdrawPool`,
        root.lookupType("MsgWithdrawPool"),
      ],
      [
        `/kyve.registry.v1beta1.MsgUpdateCommission`,
        root.lookupType("MsgUpdateCommission"),
      ],
    ])
  );
};
