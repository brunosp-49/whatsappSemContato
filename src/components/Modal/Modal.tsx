import { FC } from "react";
import { View, Modal, TouchableOpacity } from "react-native"
import { styles } from "./Modal.style";
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    onClose: () => void;
    visible: boolean;
    transparent: boolean;
    children: Element;
    height?: string | number;
}

export const ModalComponent: FC<Props> = ({ onClose, transparent, visible, children, height }) => {
    return (
        <Modal visible={visible} transparent={transparent}>
            <View style={styles({height: null}).modalContainer}>
                <View style={height ? styles({height}).modal : styles({height: null}).modal}>
                    <View style={styles({height: null}).closeContainer}>
                        <TouchableOpacity onPress={onClose}>
                            <Icon name="close" size={35} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <>
                        {children}
                    </>
                </View>
            </View>
        </Modal>
    )
}