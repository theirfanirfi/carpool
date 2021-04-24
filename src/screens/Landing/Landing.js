import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Colors } from '~/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientButton } from '~/components/GradientButton';

const {width, height} = Dimensions.get('window')

export const Landing = () => {

  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  const landingBg = require('~/assets/images/landingBg.png')

  const style = styles(insets)

  return (
    <View style={style.container} >
      <View style={style.imageContainer} >
        <Image source={landingBg} style={style.topImage} />
      </View>
      <View style={style.bottomContainer} >

        <View style={style.buttonContainer} >
          <GradientButton
            onPress={() => null}
            gradientDisabled
            colors={Colors.primary.black}
            title={'Sign in with Apple'}
          />
          <GradientButton
            onPress={() => null}
            colors={[Colors.primary.lightBlue, Colors.primary.blue]}
            title={'Sign In'}
          />
          <GradientButton
            onPress={() => null}
            gradientDisabled
            colors={Colors.primary.royalBlue}
            title={'Create account'}
          />
          <View style={style.privacyContainer} >
            <Text style={style.termsText}>{'By signing up, you accept our '}
              <Text 
              onPress={() => console.log('terms')}
              style={[style.termsText, style.link]}>{'Terms'}</Text>
              <Text style={style.termsText}>{' and '}</Text>
              <Text 
              onPress={() => console.log('priv')}
              style={[style.termsText, style.link]}>{'Privacy Policy'}</Text>
            </Text>
          </View>
        </View>
        
      </View>
    </View>
  );

}


// Styles
const styles = (insets) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.lightBlue,
    justifyContent: 'space-between'
  },
  imageContainer: {
    justifyContent:'flex-start',
    width: width
  },
  topImage: {
    width: width,
    resizeMode: 'cover',
    position: 'absolute',
  },
  bottomContainer: {
    minHeight: '35%',
    justifyContent: 'center',
  },
  buttonContainer: {
    justifyContent:'space-around',
    paddingHorizontal: 16,
    paddingBottom: insets.bottom+12,
    paddingTop: 16,
    flex: 1,
  },
  privacyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  termsText: {
    color: Colors.primary.black,
    fontSize: 14
  },
  link: {
    fontWeight: '600'
  }

});
