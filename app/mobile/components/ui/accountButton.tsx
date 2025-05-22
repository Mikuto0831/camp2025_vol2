import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { signOut } from "firebase/auth";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { auth } from "../../config";
import { router } from 'expo-router';

const handlePress = (): void => {
    signOut(auth)
        .then(
            () => {
                router.replace('/Auth/sign_in')
            }
        )
        .catch(
            (error) => {
                const { code, message } = error
                console.log(code, message)
            }
        )
}



const AccountButton = (): JSX.Element => {


    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <MaterialCommunityIcons name='account' size={24} color='#000000' />
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({

    container: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFAA00',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        shadowColor: '#000000',
        shadowOpacity: 0.25,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 8 },
        right: 10,
        top: 10
    }
})

export default AccountButton;