import {Dimensions, StyleSheet} from 'react-native';
import { darkTheme, lightTheme } from '../../assets/themes';

interface Props{
  theme: boolean;
}

const {width, height} = Dimensions.get('window');
const units = {
  vw: width / 100,
  vh: height / 100,
};

export const style = (props: Props) => StyleSheet.create({
  container: {
    paddingHorizontal: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: units.vh * 8,
    backgroundColor: !props.theme ? lightTheme.subColor : darkTheme.subColor,
  },
  text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    letterSpacing: 0.7,
  },
  iconsContainer: {
    width: '18%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  }
});
