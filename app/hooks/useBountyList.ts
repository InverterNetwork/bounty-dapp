import { BountyManager_ABI } from '@/lib/constants'
import { formatUnits, hexToString } from 'viem'
import { useContractRead } from 'wagmi'
import { useWorkflowConfig } from './useWorkflowConfig'
import { useQuery } from 'react-query'
import { ParsedBountyDetails } from '@/lib/types/bounty'

export function useBountyList() {
  const workflowConfig = useWorkflowConfig()

  const ids = useContractRead({
    abi: BountyManager_ABI,
    address: workflowConfig.data?.addresses.bountyManagerAddress,
    functionName: 'listBountyIds',
  })

  const list = useQuery(
    ['bountyList', ids.internal.dataUpdatedAt],
    async () => {
      const list = await Promise.all(
        (ids.data || []).map(async (bountyId: bigint) => {
          const bounty =
            await workflowConfig.data?.contracts.bountyManagerContract.read.getBountyInformation(
              [bountyId]
            )!

          const newBounty = {
            ...bounty,
            details: <ParsedBountyDetails>(() => {
              try {
                return JSON.parse(hexToString(bounty.details))
              } catch {
                return {}
              }
            }),
            minimumPayoutAmount: formatUnits(
              bounty.minimumPayoutAmount,
              workflowConfig.data?.ERC20Decimals!
            ),
            maximumPayoutAmount: formatUnits(
              bounty.minimumPayoutAmount,
              workflowConfig.data?.ERC20Decimals!
            ),
          }

          return newBounty
        })
      )

      return list
    },
    {
      enabled: ids.isSuccess,
    }
  )

  return list
}
