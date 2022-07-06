import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgFundPool, MsgDefundPool, MsgStakePool, MsgUnstakePool, MsgDelegatePool, MsgWithdrawPool, MsgUndelegatePool, MsgSubmitBundleProposal, MsgVoteProposal, MsgClaimUploaderRole, MsgUpdateMetadata } from "@kyve/proto/dist/proto/kyve/registry/v1beta1/tx";
export declare const registry: ReadonlyArray<[string, GeneratedType]>;
export declare const load: (protoRegistry: Registry) => void;
export declare const encodeTxMsg: {
    fundPool(value: MsgFundPool): {
        type_url: string;
        value: Uint8Array;
    };
    defundPool(value: MsgDefundPool): {
        type_url: string;
        value: Uint8Array;
    };
    stakePool(value: MsgStakePool): {
        type_url: string;
        value: Uint8Array;
    };
    unstakePool(value: MsgUnstakePool): {
        type_url: string;
        value: Uint8Array;
    };
    delegatePool(value: MsgDelegatePool): {
        type_url: string;
        value: Uint8Array;
    };
    withdrawPool(value: MsgWithdrawPool): {
        type_url: string;
        value: Uint8Array;
    };
    undelegatePool(value: MsgUndelegatePool): {
        type_url: string;
        value: Uint8Array;
    };
    submitBundleProposal(value: MsgSubmitBundleProposal): {
        type_url: string;
        value: Uint8Array;
    };
    voteProposal(value: MsgVoteProposal): {
        type_url: string;
        value: Uint8Array;
    };
    claimUploaderRole(value: MsgClaimUploaderRole): {
        type_url: string;
        value: Uint8Array;
    };
    updateMetadata(value: MsgUpdateMetadata): {
        type_url: string;
        value: Uint8Array;
    };
};
export declare const withTypeUrl: {
    fundPool(value: MsgFundPool): {
        typeUrl: string;
        value: MsgFundPool;
    };
    defundPool(value: MsgDefundPool): {
        typeUrl: string;
        value: MsgDefundPool;
    };
    stakePool(value: MsgStakePool): {
        typeUrl: string;
        value: MsgStakePool;
    };
    unstakePool(value: MsgUnstakePool): {
        typeUrl: string;
        value: MsgUnstakePool;
    };
    delegatePool(value: MsgDelegatePool): {
        typeUrl: string;
        value: MsgDelegatePool;
    };
    withdrawPool(value: MsgWithdrawPool): {
        typeUrl: string;
        value: MsgWithdrawPool;
    };
    undelegatePool(value: MsgUndelegatePool): {
        typeUrl: string;
        value: MsgUndelegatePool;
    };
    submitBundleProposal(value: MsgSubmitBundleProposal): {
        typeUrl: string;
        value: MsgSubmitBundleProposal;
    };
    voteProposal(value: MsgVoteProposal): {
        typeUrl: string;
        value: MsgVoteProposal;
    };
    claimUploaderRole(value: MsgClaimUploaderRole): {
        typeUrl: string;
        value: MsgClaimUploaderRole;
    };
    updateMetadata(value: MsgUpdateMetadata): {
        typeUrl: string;
        value: MsgUpdateMetadata;
    };
};
export declare const MessageComposer: {
    encoded: {
        fundPool(value: MsgFundPool): {
            type_url: string;
            value: Uint8Array;
        };
        defundPool(value: MsgDefundPool): {
            type_url: string;
            value: Uint8Array;
        };
        stakePool(value: MsgStakePool): {
            type_url: string;
            value: Uint8Array;
        };
        unstakePool(value: MsgUnstakePool): {
            type_url: string;
            value: Uint8Array;
        };
        delegatePool(value: MsgDelegatePool): {
            type_url: string;
            value: Uint8Array;
        };
        withdrawPool(value: MsgWithdrawPool): {
            type_url: string;
            value: Uint8Array;
        };
        undelegatePool(value: MsgUndelegatePool): {
            type_url: string;
            value: Uint8Array;
        };
        submitBundleProposal(value: MsgSubmitBundleProposal): {
            type_url: string;
            value: Uint8Array;
        };
        voteProposal(value: MsgVoteProposal): {
            type_url: string;
            value: Uint8Array;
        };
        claimUploaderRole(value: MsgClaimUploaderRole): {
            type_url: string;
            value: Uint8Array;
        };
        updateMetadata(value: MsgUpdateMetadata): {
            type_url: string;
            value: Uint8Array;
        };
    };
    withTypeUrl: {
        fundPool(value: MsgFundPool): {
            typeUrl: string;
            value: MsgFundPool;
        };
        defundPool(value: MsgDefundPool): {
            typeUrl: string;
            value: MsgDefundPool;
        };
        stakePool(value: MsgStakePool): {
            typeUrl: string;
            value: MsgStakePool;
        };
        unstakePool(value: MsgUnstakePool): {
            typeUrl: string;
            value: MsgUnstakePool;
        };
        delegatePool(value: MsgDelegatePool): {
            typeUrl: string;
            value: MsgDelegatePool;
        };
        withdrawPool(value: MsgWithdrawPool): {
            typeUrl: string;
            value: MsgWithdrawPool;
        };
        undelegatePool(value: MsgUndelegatePool): {
            typeUrl: string;
            value: MsgUndelegatePool;
        };
        submitBundleProposal(value: MsgSubmitBundleProposal): {
            typeUrl: string;
            value: MsgSubmitBundleProposal;
        };
        voteProposal(value: MsgVoteProposal): {
            typeUrl: string;
            value: MsgVoteProposal;
        };
        claimUploaderRole(value: MsgClaimUploaderRole): {
            typeUrl: string;
            value: MsgClaimUploaderRole;
        };
        updateMetadata(value: MsgUpdateMetadata): {
            typeUrl: string;
            value: MsgUpdateMetadata;
        };
    };
    toJSON: {
        fundPool(value: MsgFundPool): {
            typeUrl: string;
            value: unknown;
        };
        defundPool(value: MsgDefundPool): {
            typeUrl: string;
            value: unknown;
        };
        stakePool(value: MsgStakePool): {
            typeUrl: string;
            value: unknown;
        };
        unstakePool(value: MsgUnstakePool): {
            typeUrl: string;
            value: unknown;
        };
        delegatePool(value: MsgDelegatePool): {
            typeUrl: string;
            value: unknown;
        };
        withdrawPool(value: MsgWithdrawPool): {
            typeUrl: string;
            value: unknown;
        };
        undelegatePool(value: MsgUndelegatePool): {
            typeUrl: string;
            value: unknown;
        };
        submitBundleProposal(value: MsgSubmitBundleProposal): {
            typeUrl: string;
            value: unknown;
        };
        voteProposal(value: MsgVoteProposal): {
            typeUrl: string;
            value: unknown;
        };
        claimUploaderRole(value: MsgClaimUploaderRole): {
            typeUrl: string;
            value: unknown;
        };
        updateMetadata(value: MsgUpdateMetadata): {
            typeUrl: string;
            value: unknown;
        };
    };
    fromJSON: {
        fundPool(value: any): {
            typeUrl: string;
            value: MsgFundPool;
        };
        defundPool(value: any): {
            typeUrl: string;
            value: MsgDefundPool;
        };
        stakePool(value: any): {
            typeUrl: string;
            value: MsgStakePool;
        };
        unstakePool(value: any): {
            typeUrl: string;
            value: MsgUnstakePool;
        };
        delegatePool(value: any): {
            typeUrl: string;
            value: MsgDelegatePool;
        };
        withdrawPool(value: any): {
            typeUrl: string;
            value: MsgWithdrawPool;
        };
        undelegatePool(value: any): {
            typeUrl: string;
            value: MsgUndelegatePool;
        };
        submitBundleProposal(value: any): {
            typeUrl: string;
            value: MsgSubmitBundleProposal;
        };
        voteProposal(value: any): {
            typeUrl: string;
            value: MsgVoteProposal;
        };
        claimUploaderRole(value: any): {
            typeUrl: string;
            value: MsgClaimUploaderRole;
        };
        updateMetadata(value: any): {
            typeUrl: string;
            value: MsgUpdateMetadata;
        };
    };
    fromPartial: {
        fundPool(value: MsgFundPool): {
            typeUrl: string;
            value: MsgFundPool;
        };
        defundPool(value: MsgDefundPool): {
            typeUrl: string;
            value: MsgDefundPool;
        };
        stakePool(value: MsgStakePool): {
            typeUrl: string;
            value: MsgStakePool;
        };
        unstakePool(value: MsgUnstakePool): {
            typeUrl: string;
            value: MsgUnstakePool;
        };
        delegatePool(value: MsgDelegatePool): {
            typeUrl: string;
            value: MsgDelegatePool;
        };
        withdrawPool(value: MsgWithdrawPool): {
            typeUrl: string;
            value: MsgWithdrawPool;
        };
        undelegatePool(value: MsgUndelegatePool): {
            typeUrl: string;
            value: MsgUndelegatePool;
        };
        submitBundleProposal(value: MsgSubmitBundleProposal): {
            typeUrl: string;
            value: MsgSubmitBundleProposal;
        };
        voteProposal(value: MsgVoteProposal): {
            typeUrl: string;
            value: MsgVoteProposal;
        };
        claimUploaderRole(value: MsgClaimUploaderRole): {
            typeUrl: string;
            value: MsgClaimUploaderRole;
        };
        updateMetadata(value: MsgUpdateMetadata): {
            typeUrl: string;
            value: MsgUpdateMetadata;
        };
    };
};
