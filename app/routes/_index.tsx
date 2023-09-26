import { LoaderFunction } from "@remix-run/node";
import anime from "animejs";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import CodeBlock from "~/components/codeblock";
import Layout from "~/components/layout";
import Navbar from "~/components/navbar";
import RandomCat from "~/components/random-cat";
import WordSlideshow from "~/components/word-slideshow";
import { changeThemes } from "~/utils/darkmode";
import { logos, projects } from "~/utils/projects";

export const gradientColors = ["from-yellow-500 to-amber-600", "from-cyan-500 to-indigo-600", "from-red-500 to-rose-600", "from-teal-500 to-emerald-600"]
export const textColors = ["text-amber-600 dark:text-amber-400", "text-cyan-600", "text-red-600", "text-teal-600"]
export const bgColors = ["bg-amber-600", "bg-cyan-600", "bg-red-600", "bg-teal-600"]

const foo = <div className={`${"from-cyan-500 to-indigo-600" ||
  "from-yellow-500 to-amber-600" ||
  "text-amber-600 dark:text-amber-400" ||
  "text-cyan-600" || "bg-amber-600" ||
  "bg-cyan-600" ||
  "from-red-500 to-rose-600 text-red-600 bg-red-600" ||
  "from-teal-500 to-emerald-600 text-teal-600 bg-teal-600"
  }`} />


// export const loader: LoaderFunction = ({ request }) => {

// }

export default function Index() {
  const [index, setIndex] = useState<number>(0)
  const [gradients] = useState(gradientColors)
  const [firstLoad, setFirstLoad] = useState(true)

  const particles = "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"

  useEffect(() => {

    particles.split("").map((_, i) => anime({
      targets: `.particle${i}`,
      keyframes: [
        { opacity: 0.3, tarnslateY: 0, left: () => anime.random(-100, 2000), scale: () => anime.random(0.9, 1.2), duration: 0 },
        { delay: () => anime.random(0, 15000), translateY: () => "-120vh", duration: () => anime.random(2000, 5000), opacity: 0 }
      ],
      easing: "easeInOutSine",
      loop: true
    }))

    const animation = anime({
      targets: ".current-gradient",
      opacity: ["100%", "0%"],
      duration: 500,
      easing: "easeInQuad",
      delay: 0,
      loop: false,
      autoplay: false
    })

    const timer = setInterval(() => {
      setFirstLoad(false)
      setIndex((i) => {
        return i === gradients.length - 1 ? 0 : i + 1
      })
      animation.play()
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return <Layout>
    <div className="w-full h-full overflow-y-auto relative">
      <Navbar index={index} />
      <div className={`h-[90vh] w-full bg-gradient-to-br overflow-clip relative next-gradient ${gradients[index]}`}>
        <div className={`absolute z-10 w-full h-full top-0 left-0 opacity-0 bg-gradient-to-br ${firstLoad ? gradients[0] : gradients?.[index - 1] || gradients[gradients.length - 1]} current-gradient`} />
        <div className="z-20 absolute flex flex-col justify-center items-center w-full h-full top-0 left-0 text-primary-light-200 backdrop-blur-[2px] cursor-default">
          <div className="h-48 w-48 md:h-64 md:w-64 rounded-full bg-cover bg-center cursor-pointer hover:scale-105 transition" style={{ backgroundImage: "url(avatar.png)" }} />
          <div className="text-2xl md:text-3xl px-10 md:px-8 py-2 my-1 border-b-2 border-primary-light-200">Joshua Lawrence, Jr.</div>
          <div className="md:text-lg font-fira-mono">Junior Fullstack Web Developer</div>
        </div>
        {particles.split("").map((_, i) => <div className={`absolute opacity-0 rounded-full w-4 h-4 bg-primary-light-200 drop-shadow-[0_0_65px_0_rgba(220,220,220,0.3)] particle${i} z-[15] -bottom-6`} key={`p${i}`} />)}
      </div>

      <div className="w-full h-[100vh] md:h-[50vh] flex flex-col md:flex-row justify-around items-start md:items-center p-8">
        <WordSlideshow index={index} />
        <CodeBlock index={index} />
      </div>

      <div className={`w-full h-1 bg-gradient-to-br relative next-gradient ${gradients[index]}`}>
        <div className={`absolute z-10 w-full h-1 top-0 left-0 opacity-0 bg-gradient-to-br ${firstLoad ? gradients[0] : gradients?.[index - 1] || gradients[gradients.length - 1]} current-gradient`} />
      </div>

      <div className={`w-full p-8 flex flex-col items-center`}>
        <div className={`text-4xl md:text-5xl py-4 w-full relative text-center font-extrabold bg-clip-text bg-gradient-to-br text-transparent next-gradient ${gradients[index]}`}>
          Showcase
          <div className={`text-4xl md:text-5xl py-4 w-full absolute top-0 left-0 text-center font-extrabold bg-clip-text bg-gradient-to-br text-transparent current-gradient ${firstLoad ? gradients[0] : gradients?.[index - 1] || gradients[gradients.length - 1]}`}>
            Showcase
          </div>
        </div>

        <div className="w-full flex flex-row flex-wrap">
          {projects.map((project, i) => <div className="rounded-lg md:min-w-[40rem] w-full shadow-md hover:shadow-xl hover:scale-[101%] p-4 transition flex flex-col sm:flex-row my-3" key={`proj${i}`}>

            <div className="h-36 w-60 shrink-0 rounded-md bg-cover bg-center mr-3 sm:m-3 self-center sm:self-start" style={{ backgroundImage: `url(${project.imageUrl})` }} />
            <div className="flex flex-col h-full w-full justify-between mt-3 sm:mt-0 md:ml-3">
              <div>
                <div className="text-2xl my-2 font-semibold">
                  {project.title}
                </div>
                <div className="font-light italic">
                  {project.blurb}
                </div>
              </div>
              <div className="my-2 w-full flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                  {project.mainTools.map(tool => <div
                    className="rounded-full bg-cover bg-center h-8 w-8 shadow-sm border-primary-dark-800 dark:border-primary-light-200 border mr-2"
                    style={{ backgroundImage: `url(${logos.filter(logo => logo.name === tool)[0]?.url})` }}
                    key={v4()}
                  />)}
                </div>
                <div className={`${textColors[index]} animate-pulse transition-colors `}>
                  Read More →
                </div>
              </div>
            </div>
          </div>)}
        </div>
      </div>

      <span className="flex flex-col w-full h-full justify-center items-center text-center bg-transparent" />
    </div>
  </Layout >
}