import React, { useState, useRef, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  CircularProgress,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CustomQrReader = ({ onLoad, onError, ...props }) => {
  const videoRef = useRef(null);
  const [hasCamera, setHasCamera] = useState(true);

  useEffect(() => {
    const verifyCamera = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        if (videoDevices.length === 0) {
          throw new Error('No camera devices found');
        }
      } catch (err) {
        onError(err);
        setHasCamera(false);
      }
    };

    const initCamera = async () => {
      await verifyCamera();
      
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().then(() => {
            onLoad(); // Notify parent when video is ready
          });
        }
      } catch (err) {
        onError(err);
      }
    };

    initCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return hasCamera ? (
    <QrReader
      {...props}
      ref={videoRef}
      constraints={{ facingMode: 'environment' }}
      videoContainerStyle={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
      videoStyle={{
        objectFit: 'cover'
      }}
    />
  ) : null;
};

const QRScanner = ({ onScan, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const retryCount = useRef(0);

  const handleScan = (result) => {
    if (result?.text) {
      onScan(result.text);
      onClose();
    }
  };

  const handleError = (err) => {
    console.error('QR Error:', err);
    setError(err.message || 'Camera access denied');
    setLoading(false);
    retryCount.current = 0;
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    retryCount.current += 1;
  };

  useEffect(() => {
    let timeout;
    if (loading) {
      timeout = setTimeout(() => {
        if (retryCount.current < 2) {
          handleRetry();
        } else {
          setError('Camera initialization failed after multiple attempts');
          setLoading(false);
        }
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [loading, error]);

  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{ sx: { borderRadius: 3, overflow: 'hidden' } }}
    >
      <DialogTitle sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: 'primary.main',
        color: 'white',
        py: 1,
        px: 2
      }}>
        Scan Customer QR Code
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ 
        position: 'relative',
        height: '400px',
        p: 0,
        bgcolor: 'background.paper'
      }}>
        {error ? (
          <Box sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            p: 3
          }}>
            <Typography variant="h6" component="div" color="error" gutterBottom>
              {error.includes('attempts') ? 'Camera Error' : 'Camera Issue'}
            </Typography>
            <Typography variant="body2" component="div" color="text.secondary" sx={{ mb: 2 }}>
              {error}
            </Typography>
            {retryCount.current < 2 && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleRetry}
              >
                Retry Camera
              </Button>
            )}
          </Box>
        ) : (
          <CustomQrReader
            onResult={handleScan}
            onError={handleError}
            onLoad={() => {
              setLoading(false);
              retryCount.current = 0;
            }}
            scanDelay={500}
          />
        )}

        {loading && !error && (
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            textAlign: 'center'
          }}>
            <CircularProgress sx={{ color: 'primary.main' }} />
            <Typography variant="body2" sx={{ mt: 2 }}>
              {retryCount.current > 0 ? 'Reconnecting...' : 'Initializing camera...'}
              <br />
              {retryCount.current < 1 && 'Please allow camera access'}
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QRScanner;