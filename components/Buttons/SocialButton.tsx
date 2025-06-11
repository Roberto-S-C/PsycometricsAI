import Colors from '@/constants/Colors'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
  onPress: () => void
  imagePath: any
  provider: string
}

const SocialButton = ({ onPress, imagePath, provider }: Props) => {
  return (
    <TouchableOpacity style={styles.socialButton} onPress={onPress}>
      <Image
        source={imagePath}
        style={styles.socialIcon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.socialButtonText}>Continue with {provider}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default SocialButton

const styles = StyleSheet.create({
  socialButton: {
    width: '100%',
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 12,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  socialButtonText: {
    color: Colors.darkBlue,
    fontSize: 16,
  },
})