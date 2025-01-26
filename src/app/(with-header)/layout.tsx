import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ReactNode, Fragment } from 'react'

export default function Layout({ children }: { children: ReactNode }
) {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  )
}
