import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';

export default function CustomButton({label, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        // backgroundColor: '#AD40AF',
        backgroundColor: Colors.primary,
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
