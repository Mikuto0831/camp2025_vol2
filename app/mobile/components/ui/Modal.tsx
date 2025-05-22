import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface Props {
    isVisible: boolean;
    onClose: () => void;
}

const modalContent = (props: Props): JSX.Element => {

    const { isVisible, onClose } = props;

    return (
        <Modal animationType='slide' transparent={true} visible={isVisible}>

            <View style={styles.modalContent}>

                <View style={styles.modaltitleContainer}>
                    <Text style={styles.modaltitle}>Hobby Ranking</Text>
                    <TouchableOpacity onPress={onClose}>
                        <MaterialIcons name="close" size={24} color="#ffffff" />
                    </TouchableOpacity>
                </View>


                <View style={styles.modalRank1}>
                    <Text style={styles.modalRanking}>1位</Text>
                    <Image style={styles.rankingImage} source={require('../../assets/images/favicon.png')}></Image>
                    <View style={styles.modalmusic}>
                        <Text style={styles.rankingName}>Arsonist</Text>
                        <Text style={styles.rankingArtist}>David Lin & X. ARI</Text>
                    </View>
                </View>

                <View style={styles.modalRank2}>
                    <Text style={styles.modalRanking}>2位</Text>
                    <Image style={styles.rankingImage} source={require('../../assets/images/favicon.png')}></Image>
                    <View style={styles.modalmusic}>
                        <Text style={styles.rankingName}>Radiant</Text>
                        <Text style={styles.rankingArtist}>Erik Castro & Mary Clare</Text>
                    </View>
                </View>

                <View style={styles.modalRank3}>
                    <Text style={styles.modalRanking}>3位</Text>
                    <Image style={styles.rankingImage} source={require('../../assets/images/favicon.png')}></Image>
                    <View style={styles.modalmusic}>
                        <Text style={styles.rankingName}>Speed of Light</Text>
                        <Text style={styles.rankingArtist}>DJ OKAWARI & AI Ninomiya</Text>
                    </View>
                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({

    modalContent: {
        height: '40%',
        width: '100%',
        backgroundColor: '#FFC272',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: 'absolute',
        bottom: 0,
    },

    modaltitleContainer: {
        height: '16%',
        backgroundColor: '#FFAA00',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },

    modaltitle: {
        color: '#ffffff',
        fontSize: 16
    },

    modalRank1: {
        backgroundColor: '#FFD700',
        flexDirection: 'row',
        height: '24%',
        borderRadius: 24,
        marginHorizontal: 10,
        marginVertical: 5,
    },

    modalRank2: {
        flexDirection: 'row',
        height: '24%',
        backgroundColor: '#C0C0C0',
        borderRadius: 24,
        marginHorizontal: 10,
        marginVertical: 5,
    },

    modalRank3: {
        flexDirection: 'row',
        height: '24%',
        backgroundColor: '#C47222',
        borderRadius: 24,
        marginHorizontal: 10,
        marginVertical: 5,
    },

    modalRanking: {
        fontSize: 32,
        marginTop: 20,
        marginLeft: 20
    },

    rankingImage: {
        width: 50,
        height: 50,
        marginTop: 15,
        marginLeft: 30
    },

    modalmusic: {
        flexDirection: 'column',
        marginLeft: 40
    },

    rankingName: {
        fontSize: 24,
        marginTop: 15
    },

    rankingArtist: {
        marginTop: 5
    },
})

export default modalContent;