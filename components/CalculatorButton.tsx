import React from 'react'
import { Text, Pressable } from 'react-native'
import * as Haptics from 'expo-haptics';

import { globalStyles } from '@/styles/global-styles';
import { Colors } from '@/constants/Colors';

interface Props {
    label: string;
    color?: string;
    blackTex?: boolean;
    doubleSize?: boolean;
    onPress: () => void;
}

const CalculatorButton = ({ 
    label, 
    color = Colors.darkGray, 
    blackTex = false, 
    doubleSize = false,
    onPress 
}: Props) => {

  return (
    <Pressable 
        style={({pressed }) => ({
            ...globalStyles.button,
            backgroundColor: color,
            opacity: pressed ? 0.8 : 1,
            width: doubleSize ? 180 : 80,
        })}
        onPress={() => {
            Haptics.selectionAsync()
            onPress()
        }}
    >
      <Text 
        style={{
            ...globalStyles.buttonText,
            color: blackTex ? 'black' : 'white',
        }}
      >{label}</Text>
    </Pressable>
  )
}

export default CalculatorButton