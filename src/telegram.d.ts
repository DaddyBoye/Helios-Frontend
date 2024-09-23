declare global {
    interface TelegramWebApp {
        ready: () => void; // Add the ready method
        initDataUnsafe: {
            user: {
                id: number;
                username?: string;
                first_name?: string;
                last_name?: string;
                // Add other properties as needed
            };
        };
        // Add other methods and properties as needed
    }

    interface Window {
        Telegram: {
            WebApp: TelegramWebApp;
        };
    }
}

export {};
