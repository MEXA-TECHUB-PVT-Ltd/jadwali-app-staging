import React from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {Text,SafeAreaView} from 'react-native';
import JdButton from './src/components/button/Buttons';
import JdInputs from './src/components/inputs/inputs';
import OnBoarding from './src/screens/auth/OnBoarding';
import SignIn from './src/screens/auth/SignIn';
import ForgotPassword from './src/screens/auth/ForgotPassword';
import ResetPassword from './src/screens/auth/ResetPassword';
import SignUp from './src/screens/auth/SignUp';
import MainStack from './src/navigation/MainStack/MainStack';
import {DMSansFont, FontsStyle} from './src/constants/Fonts';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

export default function () {
  const theme = extendTheme({
    fontConfig: {
      'noto-sans': {
        100: {
          normal: 'NotoSans-Light',
          italic: 'NotoSans-LightItalic',
        },
        200: {
          normal: 'NotoSans-Light',
          italic: 'NotoSans-LightItalic',
        },
        300: {
          normal: 'NotoSans-Light',
          italic: 'NotoSans-LightItalic',
        },
        400: {
          normal: 'NotoSans-Regular',
          italic: 'NotoSans-Italic',
        },
        500: {
          normal: 'NotoSans-Medium',
          italic: 'NotoSans-MediumItalic',
        },
        600: {
          normal: 'NotoSans-Medium',
          italic: 'NotoSans-MediumItalic',
        },
        700: {
          normal: 'NotoSans-Bold',
          italic: 'NotoSans-BoldItalic',
        },
        800: {
          normal: 'NotoSans-Bold',
          italic: 'NotoSans-BoldItalic',
        },
        900: {
          normal: 'NotoSans-Bold',
          italic: 'NotoSans-BoldItalic',
        },
      },
    },
    fonts: {
      body: 'noto-sans.500', // Default weight for body text
      heading: 'noto-sans.500', // Default weight for headings
    },
    colors: {
      // Add new color
      primary: {
        '50': '#6c309c',
        '100': '#a865de',
        '200': '#944bd1',
        '300': '#8039ba',
        '400': '#bb81ea',
        '500': '#5e3085',
        '600': '#522e6f',
        '700': '#452b5a',
        '800': '#392747',
        '900': '#2c2135',
        '20': '#C7AEDB',
      },
      // Redefining only one shade, rest of the color will remain same.
      grey: {
        400: '#979797',
      },
      secondary: '#F7F7F7',
      pro: '#F4E9FD',
      loc: '#FCFCFC',
    },

    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'light',
    },
  });

  return (
    <SafeAreaView style={{flex:1}}>
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <MainStack />
      </NativeBaseProvider>
    </Provider>
    </SafeAreaView>

  );
}
