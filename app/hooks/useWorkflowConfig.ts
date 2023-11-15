'use-client'

import {
  getBountyManagerContract,
  getERC20Contract,
  getOrchestratorContract,
  getRebasingFundingManagerContract,
} from '@/lib'
import { useQuery } from 'react-query'
import { PublicClient, usePublicClient } from 'wagmi'

const orchestratorAddress = '0x0A7c8C0EB1afAb6CBaD4bb2d4c738acFF047814A'

export function useWorkflowConfig() {
  const publicClient = usePublicClient()

  const init = async (
    publicClient: PublicClient,
    orchestratorAddress: `0x${string}` | undefined
  ) => {
    if (!publicClient || !orchestratorAddress) return undefined

    const orchestratorContract = getOrchestratorContract(
      publicClient,
      orchestratorAddress
    )

    const mainContractAddresses = {
      authorizerAddress: await orchestratorContract.read.authorizer(),
      fundingManagerAddress: await orchestratorContract.read.fundingManager(),
      paymentProcessorAddress:
        await orchestratorContract.read.paymentProcessor(),
      bountyManagerAddress:
        await orchestratorContract.read.findModuleAddressInOrchestrator([
          'BountyManager',
        ]),
    }

    const fundingManagerContract = getRebasingFundingManagerContract(
      publicClient,
      mainContractAddresses.fundingManagerAddress
    )

    const ERC20Address = <`0x${string}`>(
      await fundingManagerContract.read.token()
    )

    const ERC20Contract = getERC20Contract(publicClient, ERC20Address)

    const bountyManagerContract = getBountyManagerContract(
      publicClient,
      mainContractAddresses.bountyManagerAddress
    )

    return {
      addresses: { ...mainContractAddresses, ERC20Address },
      contracts: {
        ERC20Contract,
        orchestratorContract,
        fundingManagerContract,
        bountyManagerContract,
      },
      ERC20Decimals: await ERC20Contract.read.decimals(),
    }
  }

  const workflowConfig = useQuery(
    ['workflowConfig', orchestratorAddress, publicClient],
    async () => await init(publicClient, orchestratorAddress)
  )

  return workflowConfig
}
