import React from "react";
import { FlatList, View } from "react-native/types";
import { IPage } from "../../../App";
import { ComponentButtonSlider, ComponentListMaker, ComponentTitleSlider } from "../../components";
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
                    <ComponentListMaker key={item.id} textMarker={item.text}/>
                } 
                keyExtractor={(item) => item.id}
            />
            </View>
            <View style={styles.buttonSlider}>
                <ComponentButtonSlider onPresI={() => setPageI(1)} />
                <ComponentButtonSlider onPresI={() => setPageI(2)} />
                <ComponentButtonSlider onPresI={() => setPageI(3)} />
                <ComponentButtonSlider onPresI={() => setPageI(4)} />
            </View>
        </>
    );
}