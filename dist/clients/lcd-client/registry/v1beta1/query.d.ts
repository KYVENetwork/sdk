import { QueryAccountAssetsRequest, QueryAccountAssetsResponse, QueryAccountDelegationListRequest, QueryAccountDelegationListResponse, QueryAccountFundedListRequest, QueryAccountFundedListResponse, QueryAccountStakedListRequest, QueryAccountStakedListResponse, QueryCanProposeRequest, QueryCanProposeResponse, QueryCanVoteRequest, QueryCanVoteResponse, QueryDelegatorRequest, QueryDelegatorResponse, QueryDelegatorsByPoolAndStakerRequest, QueryDelegatorsByPoolAndStakerResponse, QueryFunderRequest, QueryFunderResponse, QueryFundersListRequest, QueryFundersListResponse, QueryParamsResponse, QueryPoolRequest, QueryPoolResponse, QueryPoolsRequest, QueryPoolsResponse, QueryProposalByHeightRequest, QueryProposalByHeightResponse, QueryProposalRequest, QueryProposalResponse, QueryProposalsRequest, QueryProposalsResponse, QueryStakeInfoRequest, QueryStakeInfoResponse, QueryStakerRequest, QueryStakerResponse, QueryStakersByPoolAndDelegatorRequest, QueryStakersByPoolAndDelegatorResponse, QueryStakersListRequest, QueryStakersListResponse, QueryAccountStakingUnbondingsRequest, QueryAccountStakingUnbondingsResponse, QueryAccountDelegationUnbondingsResponse, QueryAccountDelegationUnbondingsRequest } from "@kyve/proto/dist/proto/kyve/registry/v1beta1/query";
import { PageRequest } from "@kyve/proto/dist/proto/cosmos/base/query/v1beta1/pagination";
import { AbstractKyveLCDClient } from "../../lcd-client.abstract";
declare type NestedPartial<T> = {
    [K in keyof T]?: T[K] extends Array<infer R> ? Array<NestedPartial<R>> : NestedPartial<T[K]>;
};
declare type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
declare type PaginationRequestType = {
    offset: string;
    limit: string;
    count_total: boolean;
    reverse: boolean;
    key: string;
};
declare type PaginationPartialRequestUtilType<T extends {
    pagination?: PageRequest;
}> = Overwrite<T, {
    pagination?: Partial<PaginationRequestType>;
}>;
declare type PaginationAllPartialRequestUtilType<T> = NestedPartial<Overwrite<T, {
    pagination?: {
        offset: string;
        limit: string;
        count_total: boolean;
        reverse: boolean;
        key: string;
    };
}>>;
declare type PaginationResponseTypeUtil<T> = Overwrite<T, {
    pagination?: {
        next_key: string;
        total: string;
    };
}>;
export declare class KyveRegistryLCDClient extends AbstractKyveLCDClient {
    constructor(restEndpoint: string);
    params(): Promise<QueryParamsResponse>;
    pool(params: QueryPoolRequest): Promise<QueryPoolResponse>;
    pools(params?: PaginationAllPartialRequestUtilType<QueryPoolsRequest>): Promise<PaginationResponseTypeUtil<QueryPoolsResponse>>;
    fundersList(params: QueryFundersListRequest): Promise<QueryFundersListResponse>;
    funder(params: QueryFunderRequest): Promise<QueryFunderResponse>;
    stakersList(params: QueryStakersListRequest): Promise<QueryStakersListResponse>;
    staker(params: QueryStakerRequest): Promise<QueryStakerResponse>;
    proposal(params: QueryProposalRequest): Promise<QueryProposalResponse>;
    proposals(params: PaginationPartialRequestUtilType<QueryProposalsRequest>): Promise<PaginationResponseTypeUtil<QueryProposalsResponse>>;
    proposalByHeight(params: QueryProposalByHeightRequest): Promise<QueryProposalByHeightResponse>;
    canPropose(params: QueryCanProposeRequest): Promise<QueryCanProposeResponse>;
    canVote(params: QueryCanVoteRequest): Promise<QueryCanVoteResponse>;
    stakeInfo(params: QueryStakeInfoRequest): Promise<QueryStakeInfoResponse>;
    accountAssets(params: QueryAccountAssetsRequest): Promise<QueryAccountAssetsResponse>;
    accountFundedList(params: PaginationPartialRequestUtilType<QueryAccountFundedListRequest>): Promise<PaginationResponseTypeUtil<QueryAccountFundedListResponse>>;
    accountStakedList(params: PaginationPartialRequestUtilType<QueryAccountStakedListRequest>): Promise<PaginationResponseTypeUtil<QueryAccountStakedListResponse>>;
    accountDelegationList(params: PaginationPartialRequestUtilType<QueryAccountDelegationListRequest>): Promise<PaginationResponseTypeUtil<QueryAccountDelegationListResponse>>;
    delegator(params: QueryDelegatorRequest): Promise<QueryDelegatorResponse>;
    delegatorsByPoolAndStaker(params: PaginationPartialRequestUtilType<QueryDelegatorsByPoolAndStakerRequest>): Promise<PaginationResponseTypeUtil<QueryDelegatorsByPoolAndStakerResponse>>;
    stakersByPoolAndDelegator(params: PaginationPartialRequestUtilType<QueryStakersByPoolAndDelegatorRequest>): Promise<PaginationResponseTypeUtil<QueryStakersByPoolAndDelegatorResponse>>;
    accountStakingUnbonding(params: PaginationAllPartialRequestUtilType<QueryAccountStakingUnbondingsRequest>): Promise<PaginationResponseTypeUtil<QueryAccountStakingUnbondingsResponse>>;
    accountDelegationUnbondings(params: PaginationAllPartialRequestUtilType<QueryAccountDelegationUnbondingsRequest>): Promise<PaginationResponseTypeUtil<QueryAccountDelegationUnbondingsResponse>>;
}
export {};
