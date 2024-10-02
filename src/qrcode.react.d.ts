declare module 'qrcode.react' {
    import { Component } from 'react';
  
    interface QRCodeProps {
      value: string;
      size?: number;
      bgColor?: string;
      fgColor?: string;
      level?: 'L' | 'M' | 'Q' | 'H';
      includeMargin?: boolean;
      renderAs?: 'canvas' | 'svg';
      imageSettings?: {
        src: string;
        x: number;
        y: number;
        height: number;
        width: number;
        excavate?: boolean;
      };
      style?: React.CSSProperties;
    }
  
    export default class QRCode extends Component<QRCodeProps> {}
  }
  