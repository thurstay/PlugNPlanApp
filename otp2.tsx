import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const otp2: React.FC = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputsRefs = useRef<Array<TextInput | null>>([]);

  // Handle Number Click
  const handleNumberPress = (num: string) => {
    const emptyIndex = otp.findIndex((val) => val === '');
    if (emptyIndex !== -1) {
      let newOtp = [...otp];
      newOtp[emptyIndex] = num;
      setOtp(newOtp);
      if (emptyIndex < 5) {
        inputsRefs.current[emptyIndex + 1]?.focus();
      }
      if (newOtp.every((digit) => digit !== '')) {
        setTimeout(() => navigation.navigate('selectcar'), 500);
      }
    }
  };

  // Handle Backspace
  const handleBackspace = () => {
    const lastFilledIndex = otp.lastIndexOf(otp.find((num) => num !== '') || '');
    if (lastFilledIndex !== -1) {
      let newOtp = [...otp];
      newOtp[lastFilledIndex] = '';
      setOtp(newOtp);
      inputsRefs.current[lastFilledIndex]?.focus();
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F1F2EC', paddingHorizontal: 20 }}>
      
      {/* Back Button */}
      <TouchableOpacity style={{ position: 'absolute', top: 90, left: 30, width: 25, height: 25, borderWidth: 1.5, borderColor: '#313F7E', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}
      onPress={() => navigation.navigate("signup")}>
        <Text style={{ fontSize: 18, color: '#313F7E' }}>←</Text>
    </TouchableOpacity>

      
      
      {/* Header */}
      <Image source={require('./assets/email.png')} style={{ width: 100, height: 100, marginBottom: 20 }} />
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#313F7E', textAlign: 'center', marginBottom: 5 }}>Enter Verification Code</Text>
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#313F7E', textAlign: 'center', marginBottom: 20 }}>We already sent it to your email</Text>

      {/* OTP Inputs */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputsRefs.current[index] = ref)}
            style={{ width: 40, height: 47, borderWidth: 2, borderColor: '#313F7E', textAlign: 'center', fontSize: 18,color:'#313F7E',fontWeight: 'bold', borderRadius: 8, marginHorizontal: 6, backgroundColor: '#FFFFFF' }}
            maxLength={1}
            keyboardType="numeric"
            value={value}
            editable={false} // Prevent manual input
          />
        ))}
      </View>

      {/* Resend Code */}
      <TouchableOpacity>
        <Text style={{ fontSize: 14, fontWeight: '500', color: '#313F7E', textDecorationLine: 'underline', marginBottom: 20 }}>Resend code</Text>
      </TouchableOpacity>

      {/* Number Pad */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: '80%' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, index) => (
          <TouchableOpacity key={index} onPress={() => handleNumberPress(num.toString())} style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#313F7E', justifyContent: 'center', alignItems: 'center', margin: 15 }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{num}</Text>
          </TouchableOpacity>
        ))}
        {[0].map((num, index) => (
          <TouchableOpacity key={index} onPress={() => handleNumberPress(num.toString())} style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#313F7E', justifyContent: 'center', alignItems: 'center', margin: 15 ,right:-45}}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{num}</Text>
          </TouchableOpacity>
        ))}
    
    
        {/* Backspace Button */}
        <TouchableOpacity onPress={handleBackspace} style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#313F7E', justifyContent: 'center', alignItems: 'center', margin: 15,right:-45 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>⌫</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default otp2;
