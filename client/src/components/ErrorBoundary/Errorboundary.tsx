import { Component, ErrorInfo, ReactNode } from "react";

type Props = {
    children: ReactNode,
    fallback: ReactNode
}

interface State {
    hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {hasError: false};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({hasError: true})

        console.log(error, errorInfo);
        
    }
    

    render() {
        if (this.state.hasError) {
            return this.props.fallback
        }

        return this.props.children
    }
}

export default ErrorBoundary