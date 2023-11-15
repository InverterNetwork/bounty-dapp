'use client'

import { Global } from '@emotion/react'
import {
  lifi,
  transformLifiChainsToDynamicEvmNetworks,
  getDynamicTheme,
} from '@/lib'
import { useColorMode } from '@chakra-ui/react'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import { MagicWalletConnectors } from '@dynamic-labs/magic'
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core'
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector'
import { useEffect, useState } from 'react'

const environmentId = 'e1748131-eea6-44be-8b9f-4c777af6c6bf'

export default function ConnectorProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { colorMode } = useColorMode()
  const isLight = colorMode === 'light'
  const { cssOverrides, shadowDomOverWrites } = getDynamicTheme(isLight)

  const [evmNetworks, setEvmNetworks] =
    useState<ReturnType<typeof transformLifiChainsToDynamicEvmNetworks>>(
      undefined
    )

  useEffect(() => {
    lifi.getChains().then((lifiChains) => {
      const evmNetworks = transformLifiChainsToDynamicEvmNetworks(lifiChains)
      setEvmNetworks(evmNetworks)
    })
  }, [])

  // RENDER
  return (
    <>
      <Global styles={shadowDomOverWrites} />
      <DynamicContextProvider
        settings={{
          environmentId,
          cssOverrides,
          walletConnectors: [EthereumWalletConnectors, MagicWalletConnectors],
          evmNetworks,
        }}
      >
        <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
      </DynamicContextProvider>
    </>
  )
}
