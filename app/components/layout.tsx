export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="relative h-[100vh] max-h-[100vh] w-[100vw] max-w-[100vw] overflow-hidden bg-primary-light-200 dark:bg-primary-dark-800 text-primary-dark-800 dark:text-primary-light-200 font-fira-sans">
        {children}
    </div>
}