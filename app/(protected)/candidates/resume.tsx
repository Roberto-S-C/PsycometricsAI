import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const PDFWebView = () => {
    const { url } = useLocalSearchParams();
    const uri = Array.isArray(url) ? url[0] : url;

    const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(uri)}&embedded=true`;

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: googleViewerUrl }}
                style={styles.webview}
            />
        </View>
    );
};

export default PDFWebView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
});