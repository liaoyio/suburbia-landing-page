import type { Content } from '@prismicio/client'
import type { JSX } from 'react'

import { Bounded } from '@/components/Bounded'
import { ButtonLink } from '@/components/ButtonLink'
import { Heading } from '@/components/Heading'
import { TallLogo, WideLogo } from '@/components/icons'
import { PrismicRichText, PrismicText, type SliceComponentProps } from '@prismicio/react'
import clsx from 'clsx'

/** Props for `Hero` */
export type HeroProps = SliceComponentProps<Content.HeroSlice>

/** Component for "Hero" Slices. */
export default function Hero({ slice }: HeroProps): JSX.Element {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-brand-pink relative h-dvh overflow-hidden text-zinc-800 bg-texture"
    >

      {/* 背景文字 Logo [Suburbia Skate] */}
      <div className="absolute inset-0 flex items-center pt-20">
        <WideLogo className={
          clsx('w-full text-brand-purple hidden opacity-20 mix-blend-multiply lg:block', 'animate-squiggle')
        }
        />
        <TallLogo className={clsx('w-full text-brand-purple opacity-20 mix-blend-multiply lg:hidden', 'animate-squiggle')} />
      </div>

      {/* Tailwind 任意值: https://v3.tailwindcss.com/docs/grid-template-rows#arbitrary-values */}
      <div className="absolute inset-0 mx-auto mt-24 grid max-w-6xl grid-rows-[1fr,auto] place-items-end px-6 ~py-10/16">
        <Heading className="relative max-w-2xl place-self-start">
          <PrismicText field={slice.primary.heading} />
        </Heading>
        <div className="flex relative w-full flex-col items-center justify-between ~gap-2/4 lg:flex-row">
          <div className="max-w-[45ch] font-semibold ~text-lg/xl">
            <PrismicRichText field={slice.primary.body} />
          </div>
          <ButtonLink
            field={slice.primary.button}
            icon="skateboard"
            size="lg"
            className="z-20 mt-2 block"
          >
            {slice.primary.button.text}
          </ButtonLink>
        </div>
      </div>
    </Bounded>
  )
}
