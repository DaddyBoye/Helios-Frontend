import { useState, useEffect } from 'react';
import axios from 'axios';

const Earn = () => {
    const [qrCode, setQrCode] = useState<string | null>(null); // QR code state

    // Fetch telegramId using the Telegram SDK and use it to fetch the QR code
    useEffect(() => {
        if (window.Telegram?.WebApp?.initDataUnsafe) {
            const userData = window.Telegram.WebApp.initDataUnsafe.user;
            if (userData) {
                fetchQRCode(userData.id); // Fetch QR code with the Telegram ID
            }
        }
    }, []);

    // Fetch the QR code from your backend using the Telegram ID
    const fetchQRCode = async (telegramId: number) => {
        try {
            const response = await axios.get(`https://server.therotrade.tech/api/user/qrcode/${telegramId}`);
            setQrCode(response.data.qrCode); // Set the fetched QR code
        } catch (error) {
            console.error('Error fetching QR code:', error);
        }
    };

    return (
        <div className="flex flex-col font-sans h-screen bg-gradient-to-b from-[#185C8D] to-[#1A1F20]">
            <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(../images/Starryy.svg)` }}></div>
            <div className="flex items-center justify-center">
                {qrCode ? (
                    <img src={qrCode} alt="Referral QR Code" />
                ) : (
                    <p>Loading QR code...</p>
                )}
            </div>
        </div>
    );
};

export default Earn;
