import { Html5Qrcode } from 'html5-qrcode';
import { useEffect } from 'react';

const qrcodeRegionId = "html5qr-code-full-region";

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props) => {
    let config = {};
    if (props.fps) {
        config.fps = props.fps;
    }
    if (props.qrbox) {
        config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
    }
    return config;
};

const Html5QrcodePlugin = (props) => {
    let html5QrcodeScanner;

    useEffect(() => {
        if (!html5QrcodeScanner?.getState()) {
            // when component mounts

            const config = createConfig(props);
            const verbose = props.verbose === true;
            // Suceess callback is required.
            if (!(props.qrCodeSuccessCallback)) {
                throw "qrCodeSuccessCallback is required callback.";
            }
            html5QrcodeScanner = new Html5Qrcode(qrcodeRegionId);


            html5QrcodeScanner.start({ facingMode: "environment" }, config, props.qrCodeSuccessCallback);
        }
    }, []);

    return (
        <div id={qrcodeRegionId} />
    );
};

export default Html5QrcodePlugin;