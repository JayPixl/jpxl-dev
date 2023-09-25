import { textColors } from "~/routes/_index"

interface props {
    index: number
}

export default function WordSlideshow({ index }: props) {
    return <div className="flex flex-col items-start w-full md:w-[40vw]">
        <div className="text-3xl font-light">
            writing
        </div>
        <div className="h-24 w-full md:w-[40vw] border-y border-primary-dark-800 dark:border-primary-light-200 overflow-clip my-5">
            <div className="w-full md:w-[40vw] whitespace-nowrap transition-transform duration-500 ease-in-out font-fira-mono" style={{ transform: `translate3d(0, ${-index * 6}rem, 0)` }}>
                <div className={`h-24 ml-5 font-bold w-full text-5xl flex justify-start items-center dark:drop-shadow-[0_0_25px_rgba(251,191,36,0.75)] ${textColors[0]}`}>
                    powerful
                </div>
                <div className={`h-24 ml-5 font-bold w-full text-5xl flex justify-start items-center dark:drop-shadow-[0_0_25px_rgba(8,145,178,0.75)] ${textColors[1]}`}>
                    clean
                </div>
                <div className={`h-24 ml-5 font-bold w-full text-5xl flex justify-start items-center dark:drop-shadow-[0_0_25px_rgba(220,38,38,0.75)] ${textColors[2]}`}>
                    dynamic
                </div>
                <div className={`h-24 ml-5 font-bold w-full text-5xl flex justify-start items-center dark:drop-shadow-[0_0_25px_rgba(13,148,136,0.75)] ${textColors[3]}`}>
                    modern
                </div>
            </div>
        </div>
        <div className="text-3xl font-light">
            code
        </div>
    </div>
}