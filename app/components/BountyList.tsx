'use client'

import {
  Stack,
  Divider,
  Heading,
  Box,
  Center,
  Text,
  Flex,
  Wrap,
  Tag,
  Button,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { EffectCards } from 'swiper/modules'
import { dark } from '@/lib/styles/theme'
import { useBountyList } from '@/hooks/useBountyList'
import { compressAddress } from '@/lib/utils'
import { useState } from 'react'

export default function BountyList() {
  const swiper = useSwiper()
  const list = useBountyList()
  const [swiperIndex, setSwiperIndex] = useState<number>()

  const bounty = list.data?.[swiperIndex ?? 0]

  return (
    <Center flexDirection={'column'} gap={6}>
      {list.isLoading ? (
        <Spinner />
      ) : (
        <Box w={60}>
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
                  backgroundColor: dark.primary[700],
                  border: `1px solid ${dark.border}`,
                }}
              >
                {({ isActive }) => {
                  isActive && setSwiperIndex(index)
                  return (
                    <Stack justify={'center'} align={'center'} p={3}>
                      <Flex gap={3}>
                        <Heading fontSize={'small'}>Title |</Heading>
                        <Text fontSize={'smaller'}>
                          {bounty.details?.title ?? '...empty'}
                        </Text>
                      </Flex>

                      <Divider />

                      <Flex gap={3}>
                        <Heading fontSize={'small'}>Description |</Heading>
                        <Text fontSize={'smaller'}>
                          {bounty.details?.description ?? '...empty'}
                        </Text>
                      </Flex>

                      <Divider />

                      <Wrap justify={'center'}>
                        <Tag>
                          Min Payout | {bounty.minimumPayoutAmount} USDC
                        </Tag>
                        <Tag>
                          Max Payout | {bounty.maximumPayoutAmount} USDC
                        </Tag>
                        <Tag maxW={'full'}>
                          <p style={{ wordBreak: 'break-all' }}>
                            Creator |{' '}
                            {compressAddress(
                              bounty.details?.creatorAddress ??
                                '0x0000000000000000000000000000000000000000'
                            )}
                          </p>
                        </Tag>
                      </Wrap>
                    </Stack>
                  )
                }}
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}

      <Button>Claim Bounty</Button>
      <Alert status={'info'} borderRadius={'xl'} fontSize={'xs'}>
        <AlertIcon />
        Details about how to use the claim func
      </Alert>
    </Center>
  )
}
