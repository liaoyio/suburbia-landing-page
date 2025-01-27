import { ButtonLink } from '@/components/ButtonLink'
import { Heading } from '@/components/Heading'
import { Logo } from '@/components/icons'
import { createClient } from '@/prismicio'
import { asImageSrc, type KeyTextField } from '@prismicio/client'

import Link from 'next/link'
import React from 'react'
import { CustomizerControlsProvider } from './context'
import Controls from './Controls'
import Loading from './Loading'
import Preview from './Preview'

interface SearchParams {
  wheel?: string
  deck?: string
  truck?: string
  bolt?: string
}

interface Props { searchParams: Promise<SearchParams> }

function findOrDefault<T extends { uid: KeyTextField }>(arr: T[], searchUid: string | undefined, defaultItem: T): T {
  return arr.find(({ uid }) => uid === searchUid) ?? defaultItem
}

export default async function Page(props: Props) {
  const searchParams = await props.searchParams

  const client = createClient()
  const customizerSettings = await client.getSingle('board_customizer')
  const { wheels, decks, metals } = customizerSettings.data

  // 同步 URL 参数
  const defaultValues = {
    defaultWheel: findOrDefault(wheels, searchParams.wheel, wheels[0]!),
    defaultDeck: findOrDefault(decks, searchParams.deck, decks[0]!),
    defaultTruck: findOrDefault(metals, searchParams.truck, metals[0]!),
    defaultBolt: findOrDefault(metals, searchParams.bolt, metals[0]!),
  }

  const wheelTextureURLs = wheels
    .map(texture => asImageSrc(texture.texture))
    .filter((url): url is string => Boolean(url))

  const deckTextureURLs = decks
    .map(texture => asImageSrc(texture.texture))
    .filter((url): url is string => Boolean(url))

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <CustomizerControlsProvider {...defaultValues}>

        <div className="relative aspect-square shrink-0 bg-[#3a414a] lg:aspect-auto lg:grow">
          <div className="absolute inset-0">
            <Preview
              deckTextureURLs={deckTextureURLs}
              wheelTextureURLs={wheelTextureURLs}
            />
          </div>

          <Link href="/" className="absolute left-6 top-6">
            <Logo className="h-12 text-white" />
          </Link>
        </div>
        <div className="grow bg-texture bg-zinc-900 text-white ~p-4/6 lg:w-96 lg:shrink-0 lg:grow-0">
          <Heading as="h1" size="sm" className="mb-6 mt-0">
            Build your board
          </Heading>

          <div className="mb-6">
            <Controls
              wheels={wheels}
              decks={decks}
              metals={metals}
              className="mb-6"
            />
          </div>

          <ButtonLink href="" color="lime" icon="plus">
            Add to cart
          </ButtonLink>
        </div>
      </CustomizerControlsProvider>
      <Loading />
    </div>
  )
}
