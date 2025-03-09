import { QrReader } from 'react-qr-reader';
import { useEffect, useRef } from 'react';

const CustomQrReader = (props) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.querySelector('canvas');
      if (canvas) {
        canvas.willReadFrequently = true;
      }
    }
  }, []);

  return (
    <div ref={canvasRef}>
      <QrReader
        {...props}
        videoContainerStyle={{
          ...props.videoContainerStyle,
          position: 'relative',
        }}
        videoStyle={{
          ...props.videoStyle,
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};