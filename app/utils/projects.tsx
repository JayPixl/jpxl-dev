export const logos: {
    name: string,
    url: string
}[] = [
        {
            name: "Remix",
            url: "https://avatars.githubusercontent.com/u/64235328?s=200&v=4"
        },
        {
            name: "MongoDB",
            url: "logos/mongodb.png"
        },
        {
            name: "Cloudinary",
            url: "logos/cloudinary3.png"
        },
        {
            name: "React",
            url: "logos/react.png"
        },
        {
            name: "TailwindCSS",
            url: "logos/tailwind.png"
        },
        {
            name: "Vite",
            url: "logos/vite.png"
        },
        {
            name: "Anime.js",
            url: "https://th.bing.com/th/id/OIP.FSB1_EVM6flG5hK4GWQ-6AHaHa?pid=ImgDet&rs=1"
        }
    ]

export const socials: {
    name: string,
    children: React.ReactNode,
    url: string
}[] = [
        {
            name: "LinkedIn",
            children: <img src="logos/linkedin.png" className="w-full h-full" />,
            url: "https://www.linkedin.com/in/joshua-lawrence-jr-398222272/"
        },
        {
            name: "GitHub",
            children: <img src="logos/github.svg" className="w-full h-full" />,
            url: "https://github.com/JayPixl"
        },
        {
            name: "Email",
            children: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-full h-full">
                <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
            </svg>,
            url: ""

        }
    ]

export const projects: {
    title: string,
    imageUrl: string,
    blurb: string,
    longDescription: string,
    mainTools: string[],
    tools: string[],
    skillsDemonstrated: string[]
}[] = [
        {
            title: "OC Mafia",
            imageUrl: "screenshots/ocmafia.png",
            blurb: "OC Mafia is an online adaptation of Forum Mafia with a stats system and character roleplay. I built this fullstack app using Remix, MongoDB, Cloudinary, and others!",
            longDescription: "",
            mainTools: [
                "Remix",
                "MongoDB",
                "Cloudinary"
            ],
            tools: [

            ],
            skillsDemonstrated: [

            ]
        },
        {
            title: "pixel-crypt",
            imageUrl: "screenshots/pixelcrypt.png",
            blurb: "I created a simple npm encryption package to demonstrate my knowledge and skills with npm modules and TypeScript, and this demo is a frontend app built with React and TailwindCSS.",
            longDescription: "",
            mainTools: [
                "React",
                "TailwindCSS",
                "Vite"
            ],
            tools: [

            ],
            skillsDemonstrated: [

            ]
        },
        {
            title: "jpxl.dev",
            imageUrl: "screenshots/jpxl-dev.png",
            blurb: "Looks kinda familiar, huh? My focus was to build a strong UI and showcase my frontend skills with animations and colorful design.",
            longDescription: "",
            mainTools: [
                "Remix",
                "Anime.js",
                "TailwindCSS"
            ],
            tools: [

            ],
            skillsDemonstrated: [

            ]
        }
    ]