import React, { Component } from 'react';
import { Alert } from '@mui/material';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert severity="error" sx={{ m: 2 }}>
          Something went wrong: {this.state.error.message}
        </Alert>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;