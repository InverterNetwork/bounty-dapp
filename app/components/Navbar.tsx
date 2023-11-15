'use client'

import { Box, Button, Flex, Stack, useColorModeValue } from '@chakra-ui/react'
import { DynamicWidget } from '@dynamic-labs/sdk-react-core'
import Image from 'next/image'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/next-js'

export default function Navbar() {
  const borderColor = useColorModeValue('light.border', 'dark.border')

  return (
    <Box className="navbar" borderBottom="1px solid" borderColor={borderColor}>
      <Flex justifyContent={'space-between'} pb={3}>
        <NextLink href="/">
          <Image
            priority
            src="/inverter-light-logo.svg"
            alt="inverter_logo"
            width={42}
            height={42}
          />
        </NextLink>
        <DynamicWidget variant="modal" />
      </Flex>

      <Flex
        justify={'center'}
        gap={4}
        pt={2}
        borderTop="1px solid"
        borderColor={borderColor}
      >
        <Button variant={'frame'} as={Link} href="/post">
          Post
        </Button>
        <Button variant={'frame'} as={Link} href="/">
          Feed
        </Button>
        <Button variant={'frame'} as={Link} href="/verify">
          Verify
        </Button>
      </Flex>
    </Box>
  )
}
