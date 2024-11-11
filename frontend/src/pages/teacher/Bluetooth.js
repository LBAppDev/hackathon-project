// src/pages/teacher/Bluetooth.js

import React, { useEffect, useState } from 'react';

const Bluetooth = ({ onDeviceFound }) => {
    const [device, setDevice] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if Bluetooth is available
        if (!navigator.bluetooth) {
            setError("Bluetooth is not supported on this device.");
            return;
        }

        // Function to start Bluetooth scanning
        const startScanning = async () => {
            try {
                const device = await navigator.bluetooth.requestDevice({
                    acceptAllDevices: true,
                    optionalServices: ['battery_service'],
                });

                setDevice(device);
                onDeviceFound(device);  // Callback to parent component when device is found
            } catch (err) {
                setError(`Failed to connect: ${err.message}`);
            }
        };

        startScanning();

        // Cleanup on unmount
        return () => {
            if (device) {
                device.gatt.disconnect();
            }
        };
    }, []);

    return (
        <div>
            {error ? (
                <p>{error}</p>
            ) : (
                <p>{device ? `Device found: ${device.name}` : "Scanning for Bluetooth devices..."}</p>
            )}
        </div>
    );
};

export default Bluetooth;
