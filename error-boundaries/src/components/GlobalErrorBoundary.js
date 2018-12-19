import React from 'react';
import { logErrorToService } from './reporting';

class GlobalErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return {
            hasError: true
        };
    }

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        logErrorToService(error, info);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <h1 style={{color: 'red'}}>
                    The App has Crashed 🙁
                </h1>
            );
        }

        return this.props.children;
    }
}

export default GlobalErrorBoundary;