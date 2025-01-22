import type { Metadata } from 'next'
import { createClient } from '@/prismicio'
import { components } from '@/slices'

import { asImageSrc, isFilled } from '@prismicio/client'
import { SliceZone } from '@prismicio/react'

export default async function Page() {
  const client = createClient()
  const page = await client.getSingle('homepage')

  return <SliceZone slices={page.data.slices} components={components} />
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle('homepage')

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      title: isFilled.keyText(page.data.meta_title)
        ? page.data.meta_title
        : undefined,
      description: isFilled.keyText(page.data.meta_description)
        ? page.data.meta_description
        : undefined,
      images: isFilled.image(page.data.meta_image)
        ? [asImageSrc(page.data.meta_image)]
        : undefined,
    },
  }
}
