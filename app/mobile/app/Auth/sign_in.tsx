import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const SingIn = (): JSX.Element => {

    return (
        <View style={styles.container}>

            <View style={styles.inner}>
                <Text style={styles.title}>に新規登録</Text>

                <Text style={styles.inputText}>メールアドレス</Text>
                <TextInput style={styles.input} />

                <Text style={styles.inputText}>パスワード</Text>
                <TextInput style={styles.input} />

                <View style={styles.footer}>
                    <Text style={styles.footerText}>アカウントをお持ちですか？</Text>

                    <TouchableOpacity>
                        <Text style={styles.footerLink}>ログイン</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity>
                    <View style={styles.button}>
                        <Text style={styles.buttonLabel}>新規登録</Text>
                    </View>
                </TouchableOpacity>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },

    inner: {
        justifyContent: 'center',
        paddingVertical: 24,
        paddingHorizontal: 27
    },

    title: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 32,
        marginBottom: 30
    },

    inputText: {
        fontSize: 16,
        color: '#000000',
    },

    input: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#FFC272',
        height: 32,
        paddingHorizontal: 4,
        marginBottom: 16,
        borderRadius: 8,
    },

    footer: {
        flexDirection: 'row',
    },

    footerText: {
        fontSize: 16,
        marginLeft: 10
    },

    footerLink: {
        fontSize: 16,
        color: '#FFAA00',
        fontWeight: 'bold',
        marginLeft: 20,
    },

    button: {
        alignSelf: 'flex-start',
        backgroundColor: '#FFAA00',
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.35,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 8 }
    },

    buttonLabel: {
        fontSize: 32,
        color: '#ffffff'
    }
})

export default SingIn;