import {
    Dimensions,
    StyleSheet,
    Platform,
    PixelRatio
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    header: {
        paddingVertical: 10 * global.ws,
        paddingHorizontal: 20 * global.hs,
        width: global.w,
        height: 75 * global.hs,
        backgroundColor: '#000',
        justifyContent: "space-between",
        flexDirection: 'row',
        alignItems: 'center'
    },
    caption: {
        fontSize: 20 * global.hs,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        height: (windowWidth - 200) * global.hs
    },
    welcome: {
        fontSize: 20 * global.hs,
        textAlign: 'center',
        margin: 10 * global.hs,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5 * global.hs,
    },
    headertitle: {
        color: '#fff',
        fontSize: 18 * global.hs
    },
    btnDiv: {
        width: '100%',
        alignItems: 'center',
    },
    btnSignup: {
        backgroundColor: '#E4234B',
        width: '80%',
        borderRadius: 12 * global.hs,
        alignItems: 'center',
        height: 30 * global.hs,
        justifyContent: 'center',
        marginTop: 50 * global.hs
    },
    btnTxt: {
        color: '#F7F8FF',
        fontSize: 14 * global.hs
    }
});

export default styles;