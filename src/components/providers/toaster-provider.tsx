"use client"
import { Toaster } from "react-hot-toast"
import ErrorBoundary from "../error-boundary"

export const ToastProvider = () => {
    return <ErrorBoundary>
        <Toaster />
    </ErrorBoundary>
}