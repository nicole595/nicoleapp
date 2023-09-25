import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { View, Text, KeyboardAvoidingView, TextInput, Alert } from "react-native";
import { styles } from "./styles"
import { colors } from '../../styles/colors';
import{ ComponentButtonInterface } from "../../components"
import {LoginNavigation, LoginTypes} from "../../navigations/login.navigation"
import { AxiosError } from 'axios';
import { useAuth } from '../../hooks/auth';
import { IAuthenticate } from '../../services/data/User';

export interface IErrorApi {
    errors: {
        rule: string
        field: string
        message: string
    }[]
}

export function Login({navigation}: LoginTypes)  {
    const { signIn } = useAuth();
    const [data,  setData] = useState<IAuthenticate>();
    const[isLoading, setIsLoading] = useState(true);
    async function handleSignIn() {
        try {
            setIsLoading(true);
            if (data?.email && data.password) {
                await signIn(data);
            } else {
                Alert.alert("Preencha todos os campos!");
                setIsLoading(false);
            }
        } catch (error) {
            const err = error as AxiosError;
            const message = err.response?.data as string
            Alert.alert(message)
            setIsLoading(false);
        }
    }
        function handleChange(item: IAuthenticate) {
            setData({ ...data, ...item })
        }
    
        useEffect(() => {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }, [])

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView>
                <Text style={styles.titles}>Login</Text>
                <View style={styles.formRow}>
                    <MaterialIcons name="email" style={styles.icon} />
                    <TextInput
                        placeholder= "E-mail"
                        placeholderTextColor={colors.third}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
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
                    />
            </View>
            <ComponentButtonInterface title ="Login" type="primary" onPressI={() => { navigation.navigate('Tab')}} />
            <ComponentButtonInterface title ="Cadastrar" type="secondary" onPressI={() => { navigation.navigate('Cadastrar')}} />
            </KeyboardAvoidingView>
        </View>
    )
}
