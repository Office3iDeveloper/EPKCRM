import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import styles from './style';

const CustomAlert = ({
    isVisible,
    message,
    onCancel,
    onCancelText,
    onConfirm,
    onConfirmText,
    headingmessage,
    onTakephoto,
    onTakephotoText,
    onFromGallery,
    onFromGalleryText
}) => {
    return (
        <Modal isVisible={isVisible} backdropOpacity={0.5} animationIn="zoomIn" animationOut="zoomOut">
            <View style={styles.modal}>
                <View>
                    <Text style={styles.headingmessage}>{headingmessage}</Text>
                    <Text style={styles.message}>{message}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    {onCancel && onCancelText && (
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
                            <Text style={styles.buttonText}>{onCancelText}</Text>
                        </TouchableOpacity>
                    )}
                    {onConfirm && onConfirmText && (
                        <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
                            <Text style={styles.buttonText}>{onConfirmText}</Text>
                        </TouchableOpacity>
                    )}
                    {onTakephoto && onTakephotoText && (
                        <TouchableOpacity style={styles.pictureButton} onPress={onTakephoto}>
                            <Text style={styles.buttonText}>{onTakephotoText}</Text>
                        </TouchableOpacity>
                    )}
                    {onFromGallery && onFromGalleryText && (
                        <TouchableOpacity style={styles.pictureButton} onPress={onFromGallery}>
                            <Text style={styles.buttonText}>{onFromGalleryText}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default CustomAlert;
