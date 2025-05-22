import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import MapView, { Polygon, MapPressEvent, Marker, Region, LatLng } from 'react-native-maps';

import ModalContent from '../../components/ui/Modal';
import AccountButton from '../../components/ui/accountButton';
import HumbergerButton from '../../components/ui/humbergerButton';

const Map = (): JSX.Element => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const coordinate: LatLng = {
        latitude: 35.6585805, 
        longitude: 139.742858
    }

    const onModalClose = () => {
        setIsModalVisible(false);
    }

    const onAddModal = () => {
        setIsModalVisible(true);
    }


    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>

                    <View style={styles.container}>

                        <MapView style={styles.mapview} initialRegion={{latitude: coordinate.latitude, longitude: coordinate.longitude, latitudeDelta: 1.0, longitudeDelta: 1.0}} onPress={() => {
                            onAddModal();
                        }}>
                        </MapView>
                    </View>

                    <ModalContent isVisible={isModalVisible} onClose={onModalClose} />


                    <HumbergerButton />
                    <AccountButton />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    mapview: {
        width: '100%',
        height: '100%',
    }

})

export default Map;

