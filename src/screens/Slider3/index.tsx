import React from "react";
import { FlatList, View } from "react-native";
import { IPage } from "../../../App";
import { ComponentButtonSlider, ComponentListMarker, ComponentTitleSlider } from "../../components";
import { styles } from "./styles";

export function Slider3({ setPageI }: IPage){
    const slide1Texts = [
        { id: '1', text: 'Registre as tarefas realizadas na horta'},
        { id: '2', text: 'Escolha o vizinho que possa ser acionado para ajudar'},
        { id: '3', text: 'Considere o clima'},
    ]
    return(
        <>
        <View style={styles.panel}>
            <ComponentTitleSlider titleI="Operação eficiente"/>
            <FlatList
                data={slide1Texts}
                renderItem={({ item }) => 
                    <ComponentListMarker key={item.id} textMarker={item.text}/>
                } 
                keyExtractor={(item) => item.id}
            />
            </View>
            <View style={styles.buttonSlider}>
                <ComponentButtonSlider onPressI={() => setPageI(1)} />
                <ComponentButtonSlider onPressI={() => setPageI(2)} />
                <ComponentButtonSlider onPressI={() => setPageI(3)} />
                <ComponentButtonSlider onPressI={() => setPageI(4)} />
            </View>
        </>
    );
}