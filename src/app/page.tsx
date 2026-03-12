import { NextPage } from 'next'
import { HomePage } from '@/components/pages/HomePage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Λεξιλόγειον - Αρχική Σελίδα',
  description: 'Καλώς ήρθατε στο Λεξιλόγειον, το συνεργατικό wiki λεξικό για τη μάθηση της ελληνικής γλώσσας.',
}

const Page: NextPage = () => {
  return <HomePage />
}

export default Page
