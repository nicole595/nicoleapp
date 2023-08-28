import React from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { View, Text, KeyboardAvoidingView, Alert } from "react-native";
import { styles } from "./styles"
import { TextInput } from 'react-native-gesture-handler';
import { colors } from '../../styles/colors';
import{ ComponentButtonInterface, ComponentLoading } from "../../components"
import { LoginTypes } from '../../navigations/login.navigation';
import { IRegister } from '../../services/data/User';
import { useEffect, useState } from 'react';
import { apiUser } from '../../services/data';
import { AxiosError } from 'axios';
export interface IErrorApi {
    errors: {
        rule: string
        field: string
        message: string
    }[]
}
export function Cadastrar({navigation}: LoginTypes) {
    const [data, setData] = useState<IRegister>()
    const [isLoading, setIsLoading] = useState(true)
    async function handleRegister() {
        try {
            setIsLoading(true)
            if(data?.name && data.email && data.password) {
                const response = await apiUser.register(data)
                Alert.alert(`${response.data.name} cadastrado!!`)
                navigation.navigate('Login')
            } else {
                Alert.alert("Preencha todos os campos!!")
            }
        } catch (error) {
            const err = error as AxiosError
            const errData = err.response?.data as IErrorApi
            let message = ""
            if (errData) {
                for (const iterator of errData.errors) {
                    message = `${message} ${iterator.message} \n`
                }
            }
            Alert.alert(message)
        } finally {
            setIsLoading(false)
        }
    }
    function handleChange(item: IRegister){
        setData({...data, ...item })
    }
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }, [])
    return (
       <>
       {isLoading ? (
            <ComponentLoading />
        ) : (
            <View style={styles.container}>
            <KeyboardAvoidingView>
            <Text style={styles.titles}>Cadastrar</Text>
            <View style={styles.formRow}>
            <Ionicons name="person" style={styles.icon} />
                <TextInput
                      placeholder= "Nome"
                      placeholderTextColor={colors.third}
                      style={styles.input}
                      onChangeText={(i) => handleChange({ name: i})}
                    />
            </View>
            <View style={styles.formRow}>
                <MaterialIcons name="email" style={styles.icon} />
                <TextInput
                    placeholder= "E-mail"
                    placeholderTextColor={colors.third}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={(i) => handleChange({ email: i})}
                />
            </View>
            <View style={styles.formRow}>
            <FontAwesome name="key" style={styles.icon} />
                <TextInput
                      placeholder= "Senha"
                      placeholderTextColor={colors.third}
                      secureTextEntry={true}
                      autoCapitalize="none"
                      style={styles.input}
                      onChangeText={(i) => handleChange({ password: i})}
                    />
            </View>
            <ComponentButtonInterface title="Salvar" type="primary" onPressI={handleRegister} />
            <ComponentButtonInterface title="Voltar" type="secondary" onPressI={() => { navigation.navigate('Login')}} />
            </KeyboardAvoidingView>
        </View>
        )}
        </>
    );
}