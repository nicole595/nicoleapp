import { StyleSheet } from "react-native/types"
import { colors } from "../../styles/colors"

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    panel: {
        flex: 1,
        marginTop: 40,
        margin: 20,
        borderRadius: 20,
        backgroundColor: colors.secondary
    },
    buttonSlider: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20
    }
});