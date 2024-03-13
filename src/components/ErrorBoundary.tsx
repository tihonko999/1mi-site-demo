import { Component, ReactNode, ErrorInfo } from "react";

type StateType = {
  hasError: boolean;
};

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(): StateType {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("ErrorBoundary", error, info);
  }

  render(): ReactNode {
    return this.state.hasError ? null : this.props.children;
  }
}
export default ErrorBoundary;
