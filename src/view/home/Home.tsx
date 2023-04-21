import { useEffect, useLayoutEffect, useState } from "react";
import { Button, Image, Linking, SafeAreaView, StatusBar, Switch, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./Home.style";
import { Header } from "../../components/header/Header";
import CountryPicker from 'react-native-country-picker-modal';
import MaskInput from "react-native-mask-input";
import { ModalComponent } from "../../components/Modal/Modal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme, lightTheme } from "../../assets/themes";


export default function Home() {

    const [showModal, setShowModal] = useState(false)
    const [countryCode, setCountryCode] = useState('55')
    const [countryLetters, setCountryLetters] = useState<any>("BR")
    const [number, setNumber] = useState("")
    const [especialDDD, setEspecialDDD] = useState(false)
    const [isDarkTheme, setIsDarkTheme] = useState(false)
    const [modalSettingsIsOpen, setModalSettingsIsOpen] = useState(false)
    const [modalInfoIsOpen, setModalInfoIsOpen] = useState(false)

    const getTheme = async () => {
        try {
            const value = await AsyncStorage.getItem('@dark_theme')
            if (value !== null) {
                setIsDarkTheme(true)
            }
        } catch (e) {
            // error reading value
        }
    }

    const setDark = async () => {
        try {
            await AsyncStorage.setItem('@dark_theme', 'true')
        } catch (e) {
            // saving error
        }
    }

    const setLight = async () => {
        try {
            await AsyncStorage.removeItem('@dark_theme');
        }
        catch (exception) {
        }
    }

    useLayoutEffect(() => {
        getTheme();
    }, [])

    const link = async () => {
        if (number.length < 11) {
            return;
        }
        await Linking.openURL(`whatsapp://send?phone=+${countryCode}${number}`);
    };

    const linkGeneral = async (type: "linkedin" | "github") => {
        if (type === "github") {
            await Linking.openURL(`https://github.com/brunosp-49/brunosp-49`);
        } else {
            await Linking.openURL(`https://www.linkedin.com/in/bruno-siqueira-de-paulo/`);
        }
    };

    const onChangeNumber = (e: string) => {
        if (e.substr(-1) === '.' || e.substr(-1) === ',') {
            e = e.slice(0, -1);
        }
        setNumber(e)
        console.log(number.length)
    }

    const onChangeSwitch = async (e: boolean) => {
        if (e) {
            await setDark();
            setIsDarkTheme(e);
        } else {
            await setLight();
            setIsDarkTheme(e);
        }
    }

    useEffect(() => {
        if (countryCode === "55") {
            setEspecialDDD(false)
        }
    }, [countryCode])

    return (
        <SafeAreaView style={styles({ theme: isDarkTheme }).container}>
            <Header onPressSettings={() => setModalSettingsIsOpen(true)} onPressInfo={() => setModalInfoIsOpen(true)} theme={isDarkTheme} />
            <View style={styles({ theme: isDarkTheme }).mid}>
                <Text style={styles({ theme: isDarkTheme }).instruction}>
                    Digite o número de telefone que você quer enviar mensagem
                </Text>
                <View style={styles({ theme: isDarkTheme }).inputContainer}>
                    <TouchableOpacity style={styles({ theme: isDarkTheme }).codeTextButton}>
                        <CountryPicker
                            onSelect={(e) => {
                                setCountryCode(e.callingCode[0]);
                                setCountryLetters(e.cca2)
                                console.log(e);
                            }}
                            filterProps={{ placeholder: 'Digite o nome do país' }}
                            translation="por"
                            countryCode={countryLetters}
                            visible={showModal}
                            withFilter
                            withFlag
                            withFlagButton
                            withCallingCodeButton
                            withCallingCode
                            withEmoji={false}
                            {...{
                                preferredCountries: ['US', 'BR'],
                                onClose: () => setShowModal(false),
                                onOpen: () => { },
                            }}
                        />
                    </TouchableOpacity>
                    <MaskInput
                        mask={especialDDD ? ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/] : ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        maxLength={16}
                        placeholderTextColor={'#9e9d9d'}
                        keyboardType="numeric"
                        value={number}
                        style={styles({ theme: isDarkTheme }).inputNumber}
                        onChangeText={(masked, unmasked) => {
                            if (number.length === 11 && countryCode !== "55") {
                                setEspecialDDD(true);
                            }
                            if (especialDDD && number.length < 12) {
                                setEspecialDDD(false);
                            }
                            onChangeNumber(unmasked);
                        }}
                    />
                </View>
                <TouchableOpacity onPress={link}>
                    <View style={styles({ theme: isDarkTheme }).buttonContainer}>
                        <Text style={styles({ theme: isDarkTheme }).buttonText}>ABRIR CHAT</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ModalComponent onClose={() => setModalSettingsIsOpen(false)} transparent visible={modalSettingsIsOpen} height={'30%'}>
                <View style={styles({ theme: isDarkTheme }).modalContainer}>
                    <Text style={styles({ theme: isDarkTheme }).modalText}>Tema escuro</Text>
                    <Switch
                        
                        trackColor={{ false: '#767577', true: darkTheme.switchActiveBar }}
                        thumbColor={isDarkTheme ? darkTheme.switchActiveHead : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(e) => onChangeSwitch(e)}
                        value={isDarkTheme}
                    />
                </View>
            </ModalComponent>
            <ModalComponent onClose={() => setModalInfoIsOpen(false)} transparent visible={modalInfoIsOpen} height={'30%'}>
                <View style={styles({ theme: isDarkTheme }).modalContainer}>
                    <Text style={styles({ theme: isDarkTheme }).modalTextInfo}>Desenvolvido por Bruno Siqueira</Text>
                    <View style={styles({ theme: isDarkTheme }).iconsContainer}>
                        <TouchableOpacity onPress={() => linkGeneral("github")}>
                            <Image source={require('../../images/github.png')} style={{ height: 60, width: 60 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => linkGeneral("linkedin")}>
                            <Image source={require('../../images/linkedin.png')} style={{ height: 50, width: 50 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ModalComponent>
            <StatusBar backgroundColor={isDarkTheme ? darkTheme.subColor : lightTheme.subColor} />
        </SafeAreaView>
    );
}