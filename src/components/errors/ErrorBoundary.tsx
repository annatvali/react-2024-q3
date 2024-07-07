import { ErrorInfo, ReactNode, Component } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 text-red-500">
          <h2>Something went wrong.</h2>
          <button
            onClick={this.handleReset}
            className="mt-4 bg-blue-500 text-white p-2"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
