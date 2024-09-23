import {View, Image} from 'native-base';
const Logo = (props: any) => {
  return (
    <Image
      h={props?.height}
      w={props?.width}
      alignSelf={props?.alignSelf}
      resizeMode={props?.resizeMode}
      source={require('../../assets/Jadwali-Logo.png')}
      alt={'logo'}
      size={props?.size}
    />
  );
};
export default Logo;
