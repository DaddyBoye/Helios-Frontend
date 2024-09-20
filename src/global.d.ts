// global.d.ts
interface TelegramWebApp {
    initDataUnsafe: any;
    expand(): void;
    onEvent(event: string, callback: () => void): void;
  }
  
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
  