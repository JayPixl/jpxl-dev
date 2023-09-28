import anime from "animejs"

interface props {
    children: React.ReactNode
    className?: string
    target: string | number
}

export default function LocalLink({ children, className, target }: props) {
    const scrollWrapper: (currentPos: number, nextPos: number, duration: number) => void = (currentPos, nextPos, duration) => {
        anime({
            targets: "#wrapper",
            scrollTop: [currentPos, nextPos],
            easing: "easeOutCirc",
            duration
        })
    }

    const handleClick: () => void = () => {
        if (typeof target === "string") {
            document.querySelector(`#${target}`)?.scrollIntoView({ behavior: 'smooth' })
            scrollWrapper(document.querySelector("#wrapper")!.scrollTop, document.getElementById(target)!.offsetTop - (window.innerHeight / 10), 500)

            // scrollWrapper(document.querySelector("#wrapper")!.scrollTop, document.querySelector("#wrapper")!.scrollTop + window.innerHeight / 10, 100)
        } else {
            scrollWrapper(document.querySelector("#wrapper")!.scrollTop, target, 500)
        }
    }

    return <div className={`${className}`} onClick={handleClick}>
        {children}
    </div>
}