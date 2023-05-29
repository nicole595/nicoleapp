import { Camera, CameraCapturedPicture, CameraType, FaceDetectionResult } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import { ComponentButtonInterface, ComponentButtonTakePicture } from '../../components';
import { AntDesign } from '@expo/vector-icons'; 
import { ButtonTakePicture } from '../../components/ButtonTakePicture';
import { styles } from "./styles";
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as FaceDetector from 'expo-face-detector';
import { BarCodeScanner, BarCodeScannerResult }from 'expo-barcode-scanner';

export function CameraScreen() {
    const [type, setType] = useState(CameraType.back);
    const [permissionCamera, requestPermissionCamera] = Camera.useCameraPermissions();
    const [permissionMedia, requestPermissionMedia] = MediaLibrary.usePermissions();
    const [photo, setPhoto] = useState<CameraCapturedPicture | ImagePicker.ImagePickerAsset>();
    const ref = useRef<Camera>(null);
    const [verPhoto, setVerPhoto] = useState(1);
    const [permissionQrCode, requestPermissionQrCode] = BarCodeScanner.usePermissions();
    const [scanned, setScanned] = useState(false);
    const [face, setFace] = useState<FaceDetector.FaceFeature>();


    if (!permissionCamera || !permissionMedia || !permissionQrCode) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permissionCamera.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>Clique para permitir o acesso a câmera</Text>
                <Button onPress={requestPermissionCamera} title="grant permission" />
            </View>
        );
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }


    if (!permissionMedia.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>Clique para permitir salvar a imagem</Text>
                <Button onPress={requestPermissionMedia} title="grant permission" />
            </View>
        );
    }

    if (!permissionQrCode.granted) {
        // QrCode permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>Clique para  permitir scanear seu rosto</Text>
                <Button onPress={requestPermissionQrCode} title="grant permission" />
            </View>
        );
    }



    async function takePicture() {
        if (ref.current) {
            const picture = await ref.current.takePictureAsync()
            setPhoto(picture)
            setVerPhoto(2)

        }
    }

    async function savePhoto() {
        const asset = await MediaLibrary.createAssetAsync(photo!.uri)
        MediaLibrary.createAlbumAsync("Images", asset, false)
        Alert.alert("Imagem salva com sucesso!")
    }

    async function pickImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        if (!result.canceled) {
            setPhoto(result.assets[0])
        }
    }
    
    const handleBarCodeScanned = ({ type, data }: BarCodeScannerResult) => {
        setScanned(true);
        alert (data);
    };
    
    const handleFacesDetected= ({ faces }: FaceDetectionResult): void => {
        if (faces.length > 0) {
            const faceDetect = faces[0] as FaceDetector.FaceFeature
            setFace(faceDetect)
            // console.log(faceDetect)
        } else {
            setFace(undefined)
        }
    };
    
    

    return (
        <View style={styles.container}>

            {verPhoto == 1 ? (
                <>
                    <ComponentButtonInterface title='Girar' type='secondary' onPressI={toggleCameraType} />
                    <Camera style={styles.camera} type={type} ref={ref} 
                        onBarCodeScanned={scanned ? undefined: handleBarCodeScanned} 
                        onFacesDetected={handleFacesDetected}
                        faceDetectorSettings={{
                            mode: FaceDetector.FaceDetectorMode.accurate,
                            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                            runClassifications: FaceDetector.FaceDetectorClassifications.all,
                            minDetectionInterval: 1000,
                            tracking: true,
                        }}
                    >
                        <ComponentButtonTakePicture onPress={takePicture} />              
                    </Camera>
                    <View style={styles.sorriso}>
                        {face && face.smilingProbability && face.smilingProbability > 0.5 ?(
                        <Text>Sorrindo</Text>
                    ) : (
                        <Text>Não</Text>
                    )} 
                    </View>
                    <ComponentButtonInterface title='Abrir imagem' type='secondary' onPressI={pickImage} />
                </>
            ) : (
                <>
                    <TouchableOpacity onPress={() => setVerPhoto(1)}>
                        <AntDesign name="arrowleft" size={30} color="black" />
                    </TouchableOpacity>
                    {photo && photo.uri && (
                        <Image source={{ uri: photo.uri }} style={styles.img} />
                    )}
                    <ComponentButtonInterface title='Salvar imagem' type='secondary' onPressI={savePhoto} />
                </>
            )}
        </View>
    )
}
