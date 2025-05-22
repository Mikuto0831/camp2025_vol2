import { TouchableOpacity, StyleSheet } from 'react-native';

import Entypo from '@expo/vector-icons/Entypo';

interface Props {
    onPressButton?: () => void;
}

const AccountButton = (props: Props): JSX.Element => {

    const { onPressButton } = props;

    return (
        <TouchableOpacity style={styles.container}>
            <Entypo name='dots-three-horizontal' size={24} color='#000000' />
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
        left: 10,
        top: 10
    }
})

export default AccountButton;