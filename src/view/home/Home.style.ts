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

export const styles = (props: Props) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: !props.theme ? lightTheme.background : darkTheme.background,
  },
  mid: {
    height: units.vh * 90,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '20%',
  },
  instruction: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    width: units.vw * 90,
    textAlign: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: !props.theme ? lightTheme.subColor : darkTheme.subColor,
    width: units.vw * 30,
    height: units.vh * 7,
    borderRadius: 3
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700'
  },
  inputContainer: {
    backgroundColor: '#fff',
    width: units.vw * 90,
    height: units.vh * 10,
    borderRadius: 5,
    flexDirection: 'row'
  },
  codeText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#787878'
  },
  codeTextButton: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputNumber: {
    width: '70%',
    fontSize: 25,
    color: '#787878'
  },
  modalContainer: {
    flex: 1,
    paddingVertical: '12%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    color: '#757575'
  },
  modalTextInfo: {
    fontSize: 16,
    color: '#757575'
  },
  iconsContainer: {
    width: '40%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10
  }
});
