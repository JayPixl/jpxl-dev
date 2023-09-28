import { Portal } from './portal'

interface props {
    children: React.ReactNode
    isOpen: boolean
    ariaLabel?: string
    className?: string
    onClick?: (...args: any) => any
}

export const Modal: React.FC<props> = ({ children, isOpen, ariaLabel, className, onClick }) => {
    if (!isOpen) return null

    return (
        <Portal wrapperId="modal">
            <div
                className="fixed inset-0 overflow-y-auto bg-primary-dark-600 bg-opacity-50 backdrop-blur-sm z-40"
                aria-labelledby={ariaLabel ?? 'modal-title'}
                role="dialog"
                aria-modal="true"
                onClick={onClick}
            ></div>
            <div className="fixed inset-0 pointer-events-none flex justify-center items-center max-h-screen z-50">
                <div className={`${className} p-4 bg-slate-300 pointer-events-auto max-h-[80%] max-w-[80%] overflow-auto rounded-md md:rounded-xl text-slate-800`}>
                    {children}
                </div>
            </div>
        </Portal>
    )
}