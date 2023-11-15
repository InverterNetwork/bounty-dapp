'use client'

import { compressAddress } from '@/lib/utils'
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Stack,
  Tag,
  Wrap,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { NumberInput } from '@/components/ui'

export default function PostPage() {
  const { address } = useAccount()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [minimumPayoutAmount, setMinimumPayoutAmount] = useState('')
  const [maximumPayoutAmount, setMaximumPayoutAmount] = useState('')

  return (
    <Center flexDirection={'column'} gap={6}>
      {false ? (
        <Spinner />
      ) : (
        <Box w={60}>
          <Stack justify={'center'} align={'center'} p={3}>
            <Flex gap={3}>
              <Heading fontSize={'small'}>Title |</Heading>
              <Text fontSize={'smaller'}>{title ?? '...empty'}</Text>
            </Flex>

            <Divider />

            <Flex gap={3}>
              <Heading fontSize={'small'}>Description |</Heading>
              <Text fontSize={'smaller'}>{description ?? '...empty'}</Text>
            </Flex>

            <Divider />

            <Wrap justify={'center'}>
              <Tag>Min Payout | {minimumPayoutAmount} USDC</Tag>
              <Tag>Max Payout | {maximumPayoutAmount} USDC</Tag>
              <Tag maxW={'full'}>
                <p style={{ wordBreak: 'break-all' }}>
                  Creator |{' '}
                  {compressAddress(
                    address ?? '0x0000000000000000000000000000000000000000'
                  )}
                </p>
              </Tag>
            </Wrap>
          </Stack>
        </Box>
      )}

      <Button>Post Bounty</Button>

      <Stack spacing={2}>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="...title of the bounty"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Input
            placeholder="...description of the bounty"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <NumberInput
          label="Minimum Payment Amount"
          value={minimumPayoutAmount}
          onChange={(e) => setMinimumPayoutAmount(e)}
        />

        <NumberInput
          label="Maximum Payment Amount"
          value={maximumPayoutAmount}
          onChange={(e) => setMaximumPayoutAmount(e)}
        />
      </Stack>

      <Alert status={'info'} borderRadius={'xl'} fontSize={'xs'}>
        <AlertIcon />
        Details about how to use the claim func
      </Alert>
    </Center>
  )
}
