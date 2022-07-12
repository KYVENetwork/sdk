import {
  QueryAccountAssetsRequest,
  QueryAccountAssetsResponse,
  QueryAccountDelegationListRequest,
  QueryAccountDelegationListResponse,
  QueryAccountFundedListRequest,
  QueryAccountFundedListResponse,
  QueryAccountStakedListRequest,
  QueryAccountStakedListResponse,
  QueryCanProposeRequest,
  QueryCanProposeResponse,
  QueryCanVoteRequest,
  QueryCanVoteResponse,
  QueryDelegatorRequest,
  QueryDelegatorResponse,
  QueryDelegatorsByPoolAndStakerRequest,
  QueryDelegatorsByPoolAndStakerResponse,
  QueryFunderRequest,
  QueryFunderResponse,
  QueryFundersListRequest,
  QueryFundersListResponse,
  QueryParamsResponse,
  QueryPoolRequest,
  QueryPoolResponse,
  QueryPoolsRequest,
  QueryPoolsResponse,
  QueryProposalByHeightRequest,
  QueryProposalByHeightResponse,
  QueryProposalRequest,
  QueryProposalResponse,
  QueryProposalsRequest,
  QueryProposalsResponse,
  QueryStakeInfoRequest,
  QueryStakeInfoResponse,
  QueryStakerRequest,
  QueryStakerResponse,
  QueryStakersByPoolAndDelegatorRequest,
  QueryStakersByPoolAndDelegatorResponse,
  QueryStakersListRequest,
  QueryStakersListResponse,
  QueryAccountStakingUnbondingsRequest,
  QueryAccountStakingUnbondingsResponse,
  QueryAccountDelegationUnbondingsResponse,
  QueryAccountDelegationUnbondingsRequest,
} from "@kyve/proto/dist/proto/kyve/registry/v1beta1/query";
import { PageRequest } from "@kyve/proto/dist/proto/cosmos/base/query/v1beta1/pagination";
import { AbstractKyveLCDClient } from "../../lcd-client.abstract";

type NestedPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer R>
    ? Array<NestedPartial<R>>
    : NestedPartial<T[K]>;
};
type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
type PaginationRequestType = {
  offset: string;
  limit: string;
  count_total: boolean;
  reverse: boolean;
  key: string;
};
type PaginationPartialRequestUtilType<T extends { pagination?: PageRequest }> =
  Overwrite<T, { pagination?: Partial<PaginationRequestType> }>;
type PaginationAllPartialRequestUtilType<T> = NestedPartial<
  Overwrite<
    T,
    {
      pagination?: {
        offset: string;
        limit: string;
        count_total: boolean;
        reverse: boolean;
        key: string;
      };
    }
  >
>;

type PaginationResponseTypeUtil<T> = Overwrite<
  T,
  { pagination?: { next_key: string; total: string } }
>;

export class KyveRegistryLCDClient extends AbstractKyveLCDClient {
  constructor(restEndpoint: string) {
    super(restEndpoint);
  }

  async params(): Promise<QueryParamsResponse> {
    const endpoint = `kyve/registry/v1beta1/params`;
    return await this.request(endpoint);
  }

  /* Pool queries a pool by ID. */
  async pool(params: QueryPoolRequest): Promise<QueryPoolResponse> {
    const endpoint = `kyve/registry/v1beta1/pool/${params.id}`;
    return await this.request(endpoint);
  }

  /* Pools queries for all pools. */
  async pools(
    params?: PaginationAllPartialRequestUtilType<QueryPoolsRequest>
  ): Promise<PaginationResponseTypeUtil<QueryPoolsResponse>> {
    const parameters: Record<string, any> = {};
    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }

    if (typeof params?.search !== "undefined") {
      parameters.search = params.search;
    }

    if (typeof params?.runtime !== "undefined") {
      parameters.runtime = params.runtime;
    }

    if (typeof params?.paused !== "undefined") {
      parameters.paused = params.paused;
    }

    const endpoint = `kyve/registry/v1beta1/pools`;
    return await this.request(endpoint, parameters);
  }

  /* FundersList returns all funder addresses with their corresponding funding amount for a given pool */
  async fundersList(
    params: QueryFundersListRequest
  ): Promise<QueryFundersListResponse> {
    const parameters: Record<string, any> = {};
    const endpoint = `kyve/registry/v1beta1/funders_list/${params.pool_id}`;
    return await this.request(endpoint, parameters);
  }

  /* Funder returns all funder info */
  async funder(params: QueryFunderRequest): Promise<QueryFunderResponse> {
    const endpoint = `kyve/registry/v1beta1/funder/${params.pool_id}/${params.funder}`;
    return await this.request(endpoint);
  }

  /* StakersList returns all staker addresses with their corresponding staking amount for a given pool */
  async stakersList(
    params: QueryStakersListRequest
  ): Promise<QueryStakersListResponse> {
    const parameters: Record<string, any> = {};
    const endpoint = `kyve/registry/v1beta1/stakers_list/${params.pool_id}`;
    return await this.request(endpoint, parameters);
  }

  /* Staker returns all staker info */
  async staker(params: QueryStakerRequest): Promise<QueryStakerResponse> {
    const endpoint = `kyve/registry/v1beta1/staker/${params.pool_id}/${params.staker}`;
    return await this.request(endpoint);
  }

  /* Proposal ... */
  async proposal(params: QueryProposalRequest): Promise<QueryProposalResponse> {
    const endpoint = `kyve/registry/v1beta1/proposal/${params.storage_id}`;
    return await this.request(endpoint);
  }

  /* Proposals ... */
  async proposals(
    params: PaginationPartialRequestUtilType<QueryProposalsRequest>
  ): Promise<PaginationResponseTypeUtil<QueryProposalsResponse>> {
    const parameters: Record<string, any> = {};

    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }
    const endpoint = `kyve/registry/v1beta1/proposals/${params.pool_id}`;
    return await this.request(endpoint, parameters);
  }

  /* ProposalByHeight ... */
  async proposalByHeight(
    params: QueryProposalByHeightRequest
  ): Promise<QueryProposalByHeightResponse> {
    const endpoint = `kyve/registry/v1beta1/proposal_by_height/${params.pool_id}/${params.height}`;
    return await this.request(endpoint);
  }

  /* CanPropose ... */
  async canPropose(
    params: QueryCanProposeRequest
  ): Promise<QueryCanProposeResponse> {
    const endpoint = `kyve/registry/v1beta1/can_propose/${params.pool_id}/${params.proposer}/${params.from_height}`;
    return await this.request(endpoint);
  }

  /* CanVote checks if voter on pool can still vote for the given bundle */
  async canVote(params: QueryCanVoteRequest): Promise<QueryCanVoteResponse> {
    const endpoint = `kyve/registry/v1beta1/can_vote/${params.pool_id}/${params.voter}/${params.storage_id}`;
    return await this.request(endpoint);
  }

  /* StakeInfo returns necessary information to become a staker (used by the protocol nodes) */
  async stakeInfo(
    params: QueryStakeInfoRequest
  ): Promise<QueryStakeInfoResponse> {
    const endpoint = `kyve/registry/v1beta1/stake_info/${params.pool_id}/${params.staker}`;
    return await this.request(endpoint);
  }

  /* AccountAssets returns an overview of the sum of all balances for a given user. e.g. balance, staking, funding, etc. */
  async accountAssets(
    params: QueryAccountAssetsRequest
  ): Promise<QueryAccountAssetsResponse> {
    const endpoint = `kyve/registry/v1beta1/account_assets/${params.address}`;
    return await this.request(endpoint);
  }

  /* AccountFundedList returns all pools the given user has funded into. */
  async accountFundedList(
    params: PaginationPartialRequestUtilType<QueryAccountFundedListRequest>
  ): Promise<PaginationResponseTypeUtil<QueryAccountFundedListResponse>> {
    const endpoint = `kyve/registry/v1beta1/account_funded_list/${params.address}`;
    return await this.request(endpoint);
  }

  /* AccountStakedList ... */
  async accountStakedList(
    params: PaginationPartialRequestUtilType<QueryAccountStakedListRequest>
  ): Promise<PaginationResponseTypeUtil<QueryAccountStakedListResponse>> {
    const endpoint = `kyve/registry/v1beta1/account_staked_list/${params.address}`;
    return await this.request(endpoint);
  }

  /* AccountDelegationList ... */
  async accountDelegationList(
    params: PaginationPartialRequestUtilType<QueryAccountDelegationListRequest>
  ): Promise<PaginationResponseTypeUtil<QueryAccountDelegationListResponse>> {
    const parameters: Record<string, any> = {};
    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }

    const endpoint = `kyve/registry/v1beta1/account_delegation_list/${params.address}`;
    return await this.request(endpoint, parameters);
  }

  /* Delegator returns all delegation info */
  async delegator(
    params: QueryDelegatorRequest
  ): Promise<QueryDelegatorResponse> {
    const endpoint = `kyve/registry/v1beta1/delegator/${params.pool_id}/${params.staker}/${params.delegator}`;
    return await this.request(endpoint);
  }

  /* DelegatorsByPoolAndStaker ... */
  async delegatorsByPoolAndStaker(
    params: PaginationPartialRequestUtilType<QueryDelegatorsByPoolAndStakerRequest>
  ): Promise<
    PaginationResponseTypeUtil<QueryDelegatorsByPoolAndStakerResponse>
  > {
    const parameters: Record<string, any> = {};

    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }
    const endpoint = `kyve/registry/v1beta1/delegators_by_pool_and_staker/${params.pool_id}/${params.staker}`;
    return await this.request(endpoint, parameters);
  }

  /* StakersByPoolAndDelegator ... */
  async stakersByPoolAndDelegator(
    params: PaginationPartialRequestUtilType<QueryStakersByPoolAndDelegatorRequest>
  ): Promise<
    PaginationResponseTypeUtil<QueryStakersByPoolAndDelegatorResponse>
  > {
    const parameters: Record<string, any> = {};

    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }

    const endpoint = `kyve/registry/v1beta1/stakers_by_pool_and_delegator/${params.pool_id}/${params.delegator}`;
    return await this.request(endpoint, parameters);
  }

  async accountStakingUnbonding(
    params: PaginationAllPartialRequestUtilType<QueryAccountStakingUnbondingsRequest>
  ): Promise<
    PaginationResponseTypeUtil<QueryAccountStakingUnbondingsResponse>
  > {
    const parameters: Record<string, any> = {};

    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }
    const endpoint = `kyve/registry/v1beta1/account_staking_unbondings/${params.address}`;
    return await this.request(endpoint, parameters);
  }

  async accountDelegationUnbondings(
    params: PaginationAllPartialRequestUtilType<QueryAccountDelegationUnbondingsRequest>
  ): Promise<
    PaginationResponseTypeUtil<QueryAccountDelegationUnbondingsResponse>
  > {
    const parameters: Record<string, any> = {};

    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }
    const endpoint = `kyve/registry/v1beta1/account_delegation_unbondings/${params.address}`;
    return await this.request(endpoint, parameters);
  }
}
