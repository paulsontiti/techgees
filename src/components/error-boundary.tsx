import React from "react"

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
    this.propss = { children: props.children }
  }

  state: {
    hasError: boolean
  }

  propss: {
    children: any
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, errorInfo);
    console.log(error)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div className='flex flex-col mt-20 items-center justify-center'>
        <h2>Oops, there is an error!</h2>
        <button
          type="button"
          onClick={() => this.setState({ hasError: false })}
        >
          Try again?
        </button>
      </div>
    }

    return this.propss.children;
  }
}

export default ErrorBoundary