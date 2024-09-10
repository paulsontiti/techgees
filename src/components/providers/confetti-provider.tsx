"use client"

import ReactConfetti from "react-confetti"
import { useConfettiStore } from "../../../hooks/use-confetti-store"
import ErrorBoundary from "../error-boundary"


export const ConfettiProvider = () => {
    const confetti = useConfettiStore()

    if (!confetti.isOpen) return null

    return (
        <ErrorBoundary>
            <ReactConfetti
                className="pointer-events-none z-[100]"
                numberOfPieces={1000}
                recycle={false}
                onConfettiComplete={() => {
                    confetti.onClose()
                }}
            />
        </ErrorBoundary>
    )
}