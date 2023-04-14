import React from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { View, Text, KeyboardAvoidingView } from "react-native";
import { styles } from "./styles"
import { TextInput } from 'react-native-gesture-handler';
import { colors } from '../../styles/colors';
import{ ComponentButtonInterface } from "../../components"
import {LoginNavigation, LoginTypes} from "../../navigations/login.navigation"

export function Login({navigation}: LoginTypes)  {
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
            <ComponentButtonInterface title ="Login" type="primary" onPressI={() => { console.log('Login')}} />
            <ComponentButtonInterface title ="Cadastrar" type="secondary" onPressI={() => { navigation.navigate('Cadastrar')}} />
            </KeyboardAvoidingView>
        </View>
    )
}