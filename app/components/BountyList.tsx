'use client'

import { BountyManager_ABI } from '@/lib/constants'
import { Stack, Divider, Heading } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper/modules'
import { formatUnits, hexToString } from 'viem'
import { useContractRead } from 'wagmi'
import { useWorkflowConfig } from '@/hooks'
import { dark } from '@/lib/styles/theme'

export default function BountyList() {
  const workflowConfig = useWorkflowConfig()

  const ids = useContractRead({
    abi: BountyManager_ABI,
    address: workflowConfig.data?.addresses.bountyManagerAddress,
    functionName: 'listBountyIds',
  })

  const list = useQuery(
    ['bountyList'],
    async () => {
      const list = await Promise.all(
        (ids.data || []).map(async (bountyId: bigint) => {
          const bounty =
            await workflowConfig.data?.contracts.bountyManagerContract.read.getBountyInformation(
              [bountyId]
            )!

          const newBounty = {
            ...bounty,
            //   details: JSON.parse(hexToString(bounty.details)),
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
      enabled: !!ids.data,
    }
  )

  return (
    <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]}>
      {(list.data || []).map((bounty, index) => (
        <SwiperSlide
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '18px',
            fontSize: '22px',
            backgroundColor: dark.primary[900],
            border: `1px solid ${dark.border}`,
          }}
        >
          <Stack h={'full'} justify={'center'}>
            <Heading>{bounty.maximumPayoutAmount}</Heading>
            <Divider />
          </Stack>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
