// ProgressDisplay.js
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const ProgressDisplay = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Connect to the Socket.IO server
        const socket = io('https://server.therotrade.tech'); // Your server URL

        // Listen for progress updates
        socket.on('progressUpdate', (newProgress) => {
            setProgress(newProgress); // Update progress state
        });

        // Cleanup when the component unmounts
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Progress Update</h1>
            <div style={{ width: '100%', backgroundColor: '#ddd', borderRadius: '5px' }}>
                <div
                    style={{
                        width: `${progress}%`,
                        height: '30px',
                        backgroundColor: '#4caf50',
                        borderRadius: '5px'
                    }}
                ></div>
            </div>
            <p>{progress}%</p>
        </div>
    );
};

export default ProgressDisplay;
