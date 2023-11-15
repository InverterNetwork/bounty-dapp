import { PublicClient, getContract } from 'viem'
import {
  BountyManager_ABI,
  Orchestrator_ABI,
  RebasingFundingManager_ABI,
} from './constants'
import { erc20ABI } from 'wagmi'

export const getOrchestratorContract = (
  publicClient: PublicClient,
  address: `0x${string}`
) =>
  getContract({
    abi: Orchestrator_ABI,
    address,
    publicClient,
  })

export const getERC20Contract = (
  publicClient: PublicClient,
  address: `0x${string}`
) =>
  getContract({
    abi: erc20ABI,
    address,
    publicClient,
  })

export const getRebasingFundingManagerContract = (
  publicClient: PublicClient,
  address: `0x${string}`
) =>
  getContract({
    abi: RebasingFundingManager_ABI,
    address,
    publicClient,
  })

export const getBountyManagerContract = (
  publicClient: PublicClient,
  address: `0x${string}`
) =>
  getContract({
    abi: BountyManager_ABI,
    address,
    publicClient,
  })
