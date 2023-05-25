import NextLink from 'next/link'
import { Link, Spacer } from '@chakra-ui/react'


export default function NotLoggedIn() {
  return (
    <>
    <Link as={NextLink} href='/signin'>
      You are not logged in. Please log in to access the feature.
    </Link>
    <Spacer />
    </>
  )
}