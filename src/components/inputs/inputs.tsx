// // import {View} from 'react-native';
// import React from 'react';
// import {Icon, Input, Pressable, Row, Text, View} from 'native-base';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {useTranslation} from 'react-i18next';
// import i18n from '../../translations/i18n';

// const JdInputs = props => {
//   const [show, setShow] = React.useState(false);
//   const {t} = useTranslation();

//   const [currentLanguage, setLanguage] = React.useState();
//   React.useEffect(() => {
//     setLanguage(i18n.language);
//   }, [i18n.language]);

//   return (
//     <>
//       {props?.label ? (
//         <Row>
//           <Text
//             mt={props?.mt}
//             ml={1}
//             fontSize={props?.fontSize}
//             fontFamily={props.fontFamily}>
//             {t(props?.label)}
//           </Text>
//           {props?.optional && (
//             <View alignSelf={'flex-end'} ml={2}>
//               <Text fontSize={11} textAlign={'left'}>
//                 ({props?.optional})
//               </Text>
//             </View>
//           )}
//         </Row>
//       ) : null}

//       <Input
//         mt={1}
//         p={2}
//         // aria-label="User Name"
//         flexDirection={currentLanguage === 'ar' ? 'row-reverse' : null}
//         type={show === true ? props?.type : 'text'}
//         placeholder={t(props.placeholder)}
//         value={props.value}
//         borderWidth={0}
//         keyboardType={props?.keyboardType}
//         onFocus={props?.onFocus}
//         onBlur={props?.onBlur}
//         onEndEditing={props?.onFocusEnd}
//         onChangeText={props.onChangeText}
//         autoCapitalize={props?.autoCapitalize}
//         // alignItems={currentLanguage === 'ar' ? 'flex-end' : null}
//         // isDisabled={props?.isDisabled}
//         isReadOnly={props?.isDisabled}
//         rounded={'full'}
//         fontSize={14}
//         fontFamily={'NotoSans-Regular'}
//         _text={{
//           color: '#B0B0B0',
//           fontSize: 14,
//           fontWeight: 'NotoSans-Regular',
//           alignSelf: 'center',
//         }}
//         bg={'#F7F7F7'}
//         InputLeftElement={
//           <Icon
//             as={
//               props?.leftIconName === 'person' ||
//               props?.leftIconName === 'search-outline' ? (
//                 <Ionicons name={props.leftIconName} />
//               ) : props?.price ? (
//                 <MaterialIcons name={props?.leftIconName}  />
//               ) : (
//                 <AntDesign name={props.leftIconName} />
//               )
//             }
//             size={5}
//             mx={2}
//             color="muted.400"
//           />
//         }
//         InputRightElement={
//           props?.rightIcon ? (
//             <Pressable onPress={() => setShow(!show)}>
//               <Icon
//                 as={
//                   <MaterialIcons
//                     name={show ? 'visibility-off' : 'visibility'}
//                   />
//                 }
//                 size={5}
//                 mx="2"
//                 color="muted.400"
//               />
//             </Pressable>
//           ) : null
//         }
//       />
//     </>
//   );
// };

// export default JdInputs;
import React from 'react';
import { Icon, Input, Pressable, Row, Text, View } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import i18n from '../../translations/i18n';
import { Platform } from 'react-native';

const JdInputs = props => {
  const [show, setShow] = React.useState(false);
  const { t } = useTranslation();

  const [currentLanguage, setLanguage] = React.useState();
  React.useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  return (
    <>
      {props?.label ? (
        <Row>
          <Text
            mt={props?.mt}
            ml={1}
            fontSize={props?.fontSize}
            fontFamily={props.fontFamily}>
            {t(props?.label)}
          </Text>
          {props?.optional && (
            <View alignSelf={'flex-end'} ml={2}>
              <Text fontSize={11} textAlign={'left'}>
                ({props?.optional})
              </Text>
            </View>
          )}
        </Row>
      ) : null}

      <Input
        mt={1}
        p={2}
        style={{ height: Platform.OS == "ios" ? 50 : props?.height }} // Set the height using style prop
        flexDirection={currentLanguage === 'ar' ? 'row-reverse' : null}
        type={show === true ? props?.type : 'text'}
        placeholder={t(props.placeholder)}
        value={props.value}
        borderWidth={0}
        keyboardType={props?.keyboardType}
        onFocus={props?.onFocus}
        onBlur={props?.onBlur}
        onEndEditing={props?.onFocusEnd}
        onChangeText={props.onChangeText}
        autoCapitalize={props?.autoCapitalize}
        isReadOnly={props?.isDisabled}
        rounded={'full'}
        fontSize={14}
        fontFamily={'NotoSans-Regular'}
        _text={{
          color: '#B0B0B0',
          fontSize: 14,
          fontWeight: 'NotoSans-Regular',
          alignSelf: 'center',
        }}
        bg={'#F7F7F7'}
        InputLeftElement={
          <Icon
            as={
              props?.leftIconName === 'person' ||
                props?.leftIconName === 'search-outline' ? (
                <Ionicons name={props.leftIconName} />
              ) : props?.price ? (
                <MaterialIcons name={props?.leftIconName} />
              ) : (
                <AntDesign name={props.leftIconName} />
              )
            }
            size={5}
            mx={2}
            color="muted.600"
          />
        }
        InputRightElement={
          props?.rightIcon ? (
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                as={
                  <MaterialIcons
                    name={show ? 'visibility-off' : 'visibility'}
                  />
                }
                size={5}
                mx="2"
                color="muted.400"
              />
            </Pressable>
          ) : null
        }
      />
    </>
  );
};

export default JdInputs;
