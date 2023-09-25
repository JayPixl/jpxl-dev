import anime from "animejs";
import { useEffect, useState } from "react";
import CodeBlock from "~/components/codeblock";
import Layout from "~/components/layout";
import Navbar from "~/components/navbar";
import WordSlideshow from "~/components/word-slideshow";
import { changeThemes } from "~/utils/darkmode";

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

      <span className="flex flex-col w-full h-full justify-center items-center text-center bg-transparent" />
    </div>
  </Layout >
}