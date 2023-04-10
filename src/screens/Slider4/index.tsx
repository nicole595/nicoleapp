import React from "react";
import { FlatList, View } from "react-native";
import { IPage } from "../../../App";
import { ComponentButtonSlider, ComponentListMarker, ComponentTitleSlider } from "../../components";
import { styles } from "./styles";

export function Slider4({ setPageI }: IPage){
    const slide1Texts = [
        { id: '1', text: 'Compre sementes de acordo com o orçamento'},
        { id: '2', text: 'Utilize a câmera para identificar os vizinhos ou pessoas intrusas'},
        { id: '3', text: 'Sempre confirme seu horário de saída e de chegada'},
    ]
    return(
        <>
        <View style={styles.panel}>
            <ComponentTitleSlider titleI="Segurança e economia"/>
            <FlatList
                data={slide1Texts}
                renderItem={({ item }) => 
                    <ComponentListMarker key={item.id} textMarker={item.text}/>
                } 
                keyExtractor={(item) => item.id}
            />
            </View>
            <View style={styles.buttonSlider}>
                <ComponentButtonSlider onPressI={() => setPageI(1)} cor={false} />
                <ComponentButtonSlider onPressI={() => setPageI(2)} cor={false} />
                <ComponentButtonSlider onPressI={() => setPageI(3)} cor={false} />
                <ComponentButtonSlider onPressI={() => setPageI(4)} cor={true} />
                <ComponentButtonSlider onPressI={() => setPageI(5)} cor={false}/>
                <ComponentButtonSlider onPressI={() => setPageI(6)} cor={false}/>
            </View>
        </>
    );
}