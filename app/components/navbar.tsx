import anime from "animejs"
import { useEffect, useState } from "react"
import { textColors } from "~/routes/_index"
import { changeThemes, getTheme } from "~/utils/darkmode"
import LocalLink from "./local-link"
import { Link } from "@remix-run/react"

interface props {
    index: number
}

export default function Navbar({ index }: props) {
    const [theme, setTheme] = useState<"system" | "light" | "dark">()
    useEffect(() => {
        setTheme(getTheme())
    }, [])

    const [settingTheme, setSettingTheme] = useState<boolean>(false)

    const setNewTheme: (newTheme: "system" | "light" | "dark") => void = (newTheme) => {
        changeThemes(newTheme)
    }

    const triggerThemeNav: () => void = () => {
        const oldSet = settingTheme
        setSettingTheme(i => true)
        anime({
            targets: ".optionsBar",
            opacity: oldSet ? ["100%", "0%"] : ["0%", "100%"],
            complete: () => {
                setSettingTheme(!oldSet)
            }
        })

    }

    const triggerNav: () => void = () => {
        setNavOpen(i => !i)
        anime({
            targets: ".xl",
            rotate: navOpen ? [45, 0] : [0, 45],
            translateY: navOpen ? ["2px", 8] : [8, "2px"]
        })
        anime({
            targets: ".xr",
            rotate: navOpen ? [-45, 0] : [0, -45],
            translateY: navOpen ? ["-2px", -8] : [-8, "-2px"]
        })
    }

    const [navOpen, setNavOpen] = useState(false)

    const navigation: {
        name: string,
        localUrl: boolean,
        target: string | number
    }[] = [
            {
                name: "Home",
                localUrl: true,
                target: 0
            },
            {
                name: "Showcase",
                localUrl: true,
                target: "showcase"
            },
            {
                name: "About",
                localUrl: true,
                target: "about"
            },
            {
                name: "Contact",
                localUrl: true,
                target: "contact"
            }
        ]

    return <div className="w-full h-[10vh] sticky top-0 md:py-4 bg-primary-light-200 dark:bg-primary-dark-800 bg-opacity-75 dark:bg-opacity-[60%] dark:backdrop-saturate-[120%] backdrop-blur-sm shadow-xl z-30">
        <div className="w-full h-full relative">
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] cursor-pointer -translate-y-[50%] text-lg sm:text-xl md:text-2xl font-fira-mono hover:scale-105 transition">
                <span className="text-primary-dark-800 dark:text-primary-light-200">jpxl</span>
                <span className={`${textColors[index]} transition-colors`}>.dev</span>
            </div>
            <div className="absolute left-5 top-[50%] -translate-y-[50%] cursor-pointer lg:hidden p-4 z-40" onClick={triggerNav}>
                <div className="h-[3px] w-8 bg-primary-dark-800 dark:bg-primary-light-200 rounded-full origin-center xl translate-y-[8px]" />
                <div className="h-[3px] w-8 bg-primary-dark-800 dark:bg-primary-light-200 rounded-full origin-center xr -translate-y-[8px]" />
            </div>
            <div className="absolute left-5 top-[50%] -translate-y-[50%] hidden lg:flex flex-row items-center z-40">
                {navigation.map(nav => nav.localUrl ? <LocalLink className="p-4 font-semibold text-lg hover:scale-105 transition-transform cursor-pointer" target={nav.target} key={nav.name}>
                    {nav.name}
                </LocalLink> : <Link to={nav.target.toString()} className="p-4 font-semibold text-lg hover:scale-105 transition-transform cursor-pointer">
                    {nav.name}
                </Link>)}
            </div>
        </div>

        <div className={`absolute top-[100%] lg:hidden left-0 p-4 bg-primary-light-200 dark:bg-primary-dark-800 z-40 bg-opacity-75 dark:bg-opacity-[60%] dark:backdrop-saturate-[120%] backdrop-blur-sm shadow-xl transition ${navOpen ? "translate-x-0 opacity-100" : "-translate-x-[100%] opacity-0"}`}>
            {navigation.map(nav => nav.localUrl ? <LocalLink className="p-4 font-semibold text-lg hover:scale-105 transition-transform cursor-pointer" target={nav.target} key={nav.name}>
                {nav.name}
            </LocalLink> : <Link to={nav.target.toString()} className="p-4 font-semibold text-lg hover:scale-105 transition-transform cursor-pointer">
                {nav.name}
            </Link>)}
        </div>

        <div className={`absolute right-5 top-[50%] -translate-y-[50%] bg-primary-dark-800 dark:bg-primary-light-200 flex justify-center items-center p-[2px] rounded-full`}>
            <div className={`dark:bg-primary-dark-800 bg-primary-light-200 flex justify-center items-center p-[2px] rounded-full cursor-pointer relative`}>
                <div className="text-primary-dark-800 dark:text-primary-light-200" onClick={triggerThemeNav}>
                    {theme === "dark" ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 md:w-6 md:h-6">
                        <path fillRule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clipRule="evenodd" />
                    </svg> : theme === "light" ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 md:w-6 md:h-6">
                        <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
                    </svg> : theme === "system" ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 md:w-6 md:h-6">
                        <path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15h-3.105a3.501 3.501 0 001.1 1.677A.75.75 0 0113.26 18H6.74a.75.75 0 01-.484-1.323A3.501 3.501 0 007.355 15H4.25A2.25 2.25 0 012 12.75v-8.5zm1.5 0a.75.75 0 01.75-.75h11.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H4.25a.75.75 0 01-.75-.75v-7.5z" clipRule="evenodd" />
                    </svg> : <div className="h-5 w-5" />}
                </div>
            </div>
        </div>
        <div className={`absolute right-5 top-[50%] -translate-y-[12%] bg-primary-dark-800 dark:bg-primary-light-200 ${settingTheme ? "flex" : "hidden"} justify-center items-center p-[2px] rounded-full opacity-0 optionsBar`}>
            <div className={`dark:bg-primary-dark-800 bg-primary-light-200 flex justify-center items-center p-[2px] rounded-full relative`}>
                <div className="text-primary-dark-800 dark:text-primary-light-200 flex flex-col justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 md:w-6 md:h-6 mb-2 cursor-pointer" onClick={triggerThemeNav}>
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 md:w-6 md:h-6 mb-2 cursor-pointer" onClick={() => setNewTheme("dark")}>
                        <path fillRule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clipRule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 md:w-6 md:h-6 mb-2 cursor-pointer" onClick={() => setNewTheme("light")}>
                        <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 md:w-6 md:h-6 mb-2 cursor-pointer" onClick={() => setNewTheme("system")}>
                        <path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v8.5A2.25 2.25 0 0115.75 15h-3.105a3.501 3.501 0 001.1 1.677A.75.75 0 0113.26 18H6.74a.75.75 0 01-.484-1.323A3.501 3.501 0 007.355 15H4.25A2.25 2.25 0 012 12.75v-8.5zm1.5 0a.75.75 0 01.75-.75h11.5a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H4.25a.75.75 0 01-.75-.75v-7.5z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
}