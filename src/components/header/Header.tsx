import { Text, TouchableOpacity, View } from "react-native"
import { style } from "./Header.style"
import Icon from 'react-native-vector-icons/Ionicons';
import { FC } from "react";

interface Props{
    onPressInfo: () => void;
    onPressSettings: () => void;
    theme: boolean;
}

export const Header:FC<Props> = ({onPressInfo, onPressSettings, theme}) => {
    return (
        <View style={style({theme}).container}>
            <Text style={style({theme}).text}>Whatsapp Sem Contato</Text>
            <View style={style({theme}).iconsContainer}>
                <TouchableOpacity onPress={onPressSettings}>
                    <Icon name="settings-sharp" size={26} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressInfo}>
                    <Icon name="information-circle" size={28} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    )
}