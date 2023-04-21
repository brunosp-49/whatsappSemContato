import { StyleSheet } from "react-native";

interface Props{
  height: string | number | null
}

export const styles = (props: Props) => StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  modal: {
    height: !props.height ? '50%' : props.height,
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 5,
    padding: '2%'
  },
  closeContainer: {
    height: '10%',
    minHeight: 32,
    justifyContent: 'center',
    alignItems: 'flex-end',
  }
})