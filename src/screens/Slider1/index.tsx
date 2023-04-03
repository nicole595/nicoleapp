import { FlatList, ImageBackground, View } from 'react-native';
import { IPage } from '../../../App'
import {
    ComponentButtonSlider, ComponentListMarker, ComponentTitleSlider
} from '../../components';
import { styles } from './styles';
export function Slider1({ setPageI }: IPage) {
    const slide1 = require("../../assets/image2.png")
    const slide1Texts = [
        { id: '1', text: 'Localize a horta'},
        { id: '2', text: 'Verifique quem está na horta'},
        { id: '3', text: 'Veja todos os alimentos disponíveis'},
        { id: '4', text: 'Registre o que colheu, plantou'},
    ]
    return (
        <ImageBackground source={slide1} style={styles.container} >
            <View style={styles.panel}>
                <ComponentTitleSlider titleI='Sistema de monitoramento' />
                <FlatList
                  data={slide1Texts}
                  renderItem={({ item }) =>
                    <ComponentListMarker key={item.id} textMarker={item.text} />
            }   
            keyExtractor={(item) => item.id} 
            />     
            </View>
            <View style={styles.buttonSlider}>
                <ComponentButtonSlider onPressI={() => setPageI(1)} cor={true} />
                <ComponentButtonSlider onPressI={() => setPageI(2)} cor={false}/>
                <ComponentButtonSlider onPressI={() => setPageI(3)} cor={false}/>
                <ComponentButtonSlider onPressI={() => setPageI(4)} cor={false}/>
                <ComponentButtonSlider onPressI={() => setPageI(5)} cor={false}/>
            </View>
        </ImageBackground>
    );
}
