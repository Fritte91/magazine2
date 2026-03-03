import { Component, ErrorInfo, ReactNode } from "react"
import { sanitizeError } from "../utils/sanitize"
import { logError } from "../utils/logger"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logError(error, {
      component: 'ErrorBoundary',
      componentStack: errorInfo.componentStack,
    })
  }

  render() {
    if (this.state.hasError) {
      // React automatically escapes text content, but we sanitize for extra safety
      const safeErrorMessage = this.state.error 
        ? sanitizeError(this.state.error) 
        : "An unexpected error occurred"
      
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">
              {safeErrorMessage}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-white rounded transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: "#225544" }}
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

