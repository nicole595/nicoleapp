import React from "react";
import { FlatList, View } from "react-native/types";
import { IPage } from "../../../App";
import { ComponentButtonSlider, ComponentListMaker, ComponentTitleSlider } from "../../components";
import { styles } from "./styles";

export function Slider3({ setPageI }: IPage){
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