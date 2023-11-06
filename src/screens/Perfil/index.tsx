import React, {useEffect,useState} from "react";
import { View, Text, Alert } from "react-native";
import { styles } from "./styles";
import { ComponentButtonInterface } from "../../components";
import { TabTypes } from "../../navigations/tab.navigation";
import { useAuth } from "../../hooks/auth";
import { IAuthenticate } from "../../services/data/User";
import { AxiosError } from "axios"
import { ComponentLoading } from "../../components"


export function Perfil({ navigation }: TabTypes) {
    const { user } = useAuth();
    const { signOut } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    async function handleSignOut() {
        try {
            setIsLoading(true);
            await signOut();
        } catch (error) {
            const err = error as AxiosError;
            const message = err.response?.data as string
            Alert.alert(message)
            setIsLoading(false);
        }
    }
    useEffect(() => {
        if (user) {
            setIsLoading(false);
        }
    }, [user]);

    return (
        <>
            {isLoading ? (
                <ComponentLoading />
            ) : (
                <View style={styles.container}>
                    <Text>Perfil</Text>
                    <ComponentButtonInterface title="Log out" type="secondary" onPressI={handleSignOut} />
                </View>
            )}
        </>
    )
}