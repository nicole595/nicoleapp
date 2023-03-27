import { FlatList, ImageBackground, View } from 'react-native';
import { IPage } from '../../../App'
import {
    ComponentButtonSlider, ComponentListMarker, ComponentTitleSlider
} from '../../components';
import { styles } from './styles';
export function Slider2({ setPageI }: IPage) {
    const slide1 = require("../../assets/image3.png")
    const slide1Texts = [
        { id: '1', text: 'Fale com a comunidade'},
        { id: '2', text: 'Envie o cronograma de cuidados'},
        { id: '3', text: 'Planeje o plantio'},
    ]
    return (
        <ImageBackground source={slide1} style={styles.container} >
            <View style={styles.panel}>
                <ComponentTitleSlider titleI='Comunique com a comunidade' />
                <FlatList
                  data={slide1Texts}
                  renderItem={({ item }) =>
                    <ComponentListMarker key={item.id} textMarker={item.text} />
            }   
            keyExtractor={(item) => item.id} 
            />     
            </View>
            <View style={styles.buttonSlider}>
                <ComponentButtonSlider onPressI={() => setPageI(1)} cor={false} />
                <ComponentButtonSlider onPressI={() => setPageI(2)} cor={true} />
                <ComponentButtonSlider onPressI={() => setPageI(3)} cor={false} />
                <ComponentButtonSlider onPressI={() => setPageI(4)} cor={false} />
            </View>
        </ImageBackground>
    );
}
