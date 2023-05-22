import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import * as SecureStore from 'expo-secure-store'
import { useRouter } from 'expo-router'

import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { useEffect } from 'react'
import { styled } from 'nativewind'

import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'
import Logo from '../src/assets/logo.svg'
import { api } from '../src/lib/api'

const StyledStripes = styled(Stripes)

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/71d19cff3bd26e573978',
}

export default function App() {
  const router = useRouter()

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '71d19cff3bd26e573978',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'spacetime',
      }),
    },
    discovery,
  )

  async function handleGithubSignIn(code: string) {
    console.log(code)
    const response = await api.post('/register', { code })

    const { token } = response.data

    SecureStore.setItemAsync('token', token)
    console.log('teste')
    router.push('/memories')
  }

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params

      handleGithubSignIn(code)
    }
  }, [])

  if (!hasLoadedFonts) return null

  return (
    <ImageBackground
      source={blurBg}
      className="py-19 flex-1 items-center justify-center bg-gray-900 px-14"
    >
      <StyledStripes className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <Logo />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Your time capsule
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Collect memorable moments from your journey and share (if you like)
            with the world!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-2"
          onPress={() => signInWithGithub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            CREATE MEMORY
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="py-4 text-center font-body text-sm leading-relaxed text-gray-200">
        Made with ❤ in NLW of Rocketseat
      </Text>
    </ImageBackground>
  )
}
