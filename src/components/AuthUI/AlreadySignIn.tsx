import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'


export default function AlreadySignedIn() {
  return (
    <>
    <Link as={NextLink} href='/dashboard'>
      You are already signed in. Click here to return to dashboard.
    </Link>
    </>
  )
}