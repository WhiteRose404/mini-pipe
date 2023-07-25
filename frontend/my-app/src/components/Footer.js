'use client'

import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { FaGithub, FaGitlab, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import { ReactNode } from 'react'

const SocialButton = ({
  children,
  label,
  href,
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function SmallWithSocial() {
  return (
    <Box
    //   bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
        mt={"auto"}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'center' }}
        align={{ base: 'center', md: 'center' }}>
        {/* <Text></Text> */}
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'Gitlab'} href={'https://gitlab.com/eddoughri.youssef'}>
            <FaGitlab />
          </SocialButton>
          <SocialButton label={'Github'} href={'https://github.com/WhiteRose404'}>
            <FaGithub />
          </SocialButton>
          <SocialButton label={'LinkedIn'} href={'https://www.linkedin.com/in/youssef-eddoughri-342b9117b/'}>
            <FaLinkedin />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  )
}