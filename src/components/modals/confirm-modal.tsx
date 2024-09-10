"use client"
import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import ErrorBoundary from '../error-boundary'



function ConfirmModal(
    {
        children, onConfirm
    }: {
        children: React.ReactNode,
        onConfirm: () => void
    }
) {
    return (
        <ErrorBoundary>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    {children}
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure of this action?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={onConfirm}>
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </ErrorBoundary>
    )
}

export default ConfirmModal