import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const Top = (): JSX.Element => {

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Text>logo</Text>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>はじめる</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>アカウントをお持ちですか？</Text>
                <TouchableOpacity>
                    <Text style={styles.footerLink}>ログイン</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center'
    },

    logo: {
        backgroundColor: '#FFAA00',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 130,
        paddingHorizontal: 130,
        borderRadius: 18

    },

    button: {
        backgroundColor: '#FFAA00',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 125,
        marginTop: 150,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.35,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 8 }
    },

    buttonText: {
        fontSize: 28,
        color: '#ffffff'
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'center'

    },

    footerText: {
        fontSize: 16,
        color: '#000000',
        marginLeft: 10,
        marginTop: 25
    },

    footerLink: {
        fontSize: 16,
        color: '#FFAA00',
        marginTop: 25,
        marginLeft: 16,
        fontWeight: 'bold'
    }
});

export default Top;