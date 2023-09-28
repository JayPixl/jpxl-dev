import { Link, Outlet } from "@remix-run/react";
import anime from "animejs";
import { useEffect, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { v4 } from "uuid";
import CodeBlock from "~/components/codeblock";
import Layout from "~/components/layout";
import LocalLink from "~/components/local-link";
import { Modal } from "~/components/modal";
import Navbar from "~/components/navbar";
import TooltipDiv from "~/components/tooltip-div";
import WordSlideshow from "~/components/word-slideshow";
import { logos, projects, socials } from "~/utils/projects";

export const gradientColors = ["from-yellow-500 to-amber-600", "from-cyan-500 to-indigo-600", "from-red-500 to-rose-600", "from-teal-500 to-emerald-600"]
export const textColors = ["text-amber-600 dark:text-amber-400", "text-sky-600", "text-red-600", "text-teal-600"]
export const hoverTextColors = ["hover:text-amber-600 hover:dark:text-amber-400", "hover:text-sky-600", "hover:text-red-600", "hover:text-teal-600"]
export const bgColors = ["bg-amber-600", "bg-sky-600", "bg-red-600", "bg-teal-600"]
export const borderColors = ["border-amber-600", "border-sky-600", "border-red-600", "border-teal-600"]

const foo = <div className={`${"from-cyan-500 to-indigo-600" ||
  "from-yellow-500 to-amber-600" ||
  "text-amber-600 dark:text-amber-400" ||
  "text-sky-600" || "bg-amber-600" ||
  "bg-sky-600" ||
  "from-red-500 to-rose-600 text-red-600 bg-red-600" ||
  "from-teal-500 to-emerald-600 text-teal-600 bg-teal-600" ||
  "hover:text-amber-600 hover:dark:text-amber-400" ||
  "hover:text-sky-600" ||
  "hover:text-red-600" ||
  "hover:text-teal-600" ||
  "border-amber-600" ||
  "border-sky-600" ||
  "border-red-600" ||
  "border-teal-600"
  }`} />


// export const loader: LoaderFunction = ({ request }) => {

// }

export default function Index() {
  const [index, setIndex] = useState<number>(0)
  const [gradients] = useState(gradientColors)
  const [firstLoad, setFirstLoad] = useState(true)
  const [scroll, setScroll] = useState<number>(0)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(0)

  let particles = ""
  for (var i: number = 0; i < 80; i++) {
    particles += "0"
  }

  let pixels = ""
  for (var i: number = 0; i < 80; i++) {
    pixels += "0"
  }

  let padPixels = ""
  for (var i: number = 0; i < 16; i++) {
    padPixels += "0"
  }


  useEffect(() => {

    particles.split("").map((_, i) => anime({
      targets: `.particle${i}`,
      keyframes: [
        { opacity: () => anime.random(10, 50) + "%", tarnslateY: 0, left: () => anime.random(-100, 2000), scale: () => anime.random(90, 150) + "%", duration: 0 },
        { delay: () => anime.random(0, 3000 + (i * 100)), translateY: () => "-120vh", duration: () => anime.random(2000, 5000), opacity: 0 }
      ],
      easing: "easeInOutSine",
      loop: true
    }))

    pixels.split("").map((_, i) => anime({
      targets: `.pixel${i}`,
      opacity: () => anime.random(0, (((i % 8) * 30) - i)) + "%",
      easing: "easeInOutSine",
      duration: () => anime.random(800, 5000),
      loop: true
    }))

    padPixels.split("").map((_, i) => anime({
      targets: `.pad-pixelb${i}`,
      opacity: () => anime.random(0, (((i % 8) * 15) - (i * 8))) + "%",
      easing: "easeInOutSine",
      duration: () => anime.random(800, 5000),
      loop: true
    }))

    padPixels.split("").map((_, i) => anime({
      targets: `.pad-pixelt${i}`,
      opacity: () => anime.random(0, (((i % 8) * 15) - ((padPixels.length - i) * 8))) + "%",
      easing: "easeInOutSine",
      duration: () => anime.random(800, 5000),
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
    <LocalLink
      className={`cursor-pointer absolute bottom-5 right-5 md:bottom-10 md:right-10 opacity-50 hover:opacity-100 rounded-full flex items-center justify-center p-3 md:p-5 shadow-2xl bg-white dark:bg-primary-dark-950 transition z-40 ${textColors[index]} ${scroll > 500 ? "translate-y-0" : "translate-y-[200px] opacity-0"}`}
      target={0}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 md:w-8 md:h-8">
        <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
      </svg>
    </LocalLink>

    <div className="w-full h-full overflow-y-auto relative" id="wrapper" onScroll={e => setScroll(e.currentTarget.scrollTop)}>
      <Navbar index={index} />

      <div className={`h-[90vh] w-full bg-gradient-to-br overflow-clip relative next-gradient ${gradients[index]}`}>
        <div className={`absolute z-10 w-full h-full top-0 left-0 opacity-0 bg-gradient-to-br ${firstLoad ? gradients[0] : gradients?.[index - 1] || gradients[gradients.length - 1]} current-gradient`} />
        <div className="z-20 absolute flex flex-col justify-center items-center w-full h-full top-0 left-0 text-primary-light-200 backdrop-blur-[2px] cursor-default">
          <div className="h-48 w-48 md:h-64 md:w-64 rounded-full bg-cover bg-center cursor-pointer hover:scale-105 transition" style={{ backgroundImage: "url(avatar.png)" }} />
          <div className="text-2xl md:text-3xl px-10 md:px-8 py-2 my-1 border-b-2 border-primary-light-200">Joshua Lawrence, Jr.</div>
          <div className="md:text-lg font-fira-mono">Junior Fullstack Web Developer</div>
          <div className="my-5 flex flex-row">
            {socials.map(acc => <TooltipDiv
              className="h-10 w-10 shadow-sm mx-2 cursor-pointer hover:scale-[105%] transition-transform text-white flex justify-center items-center"
              tooltipText={acc.name}
              size="large"
              key={v4().slice(0, 9)}
            >
              {acc.local ? <LocalLink
                target={acc.url}
              >
                {acc.children}
              </LocalLink> : <Link to={acc.url}>
                {acc.children}
              </Link>}

            </TooltipDiv>)}
          </div>
        </div>
        {particles.split("").map((_, i) => <div className={`absolute opacity-0 rounded-full w-4 h-4 bg-primary-light-200 drop-shadow-[0_0_65px_0_rgba(220,220,220,0.3)] backdrop-brightness-150 particle${i} z-[15] -bottom-6`} key={`p${i}`} />)}
      </div>

      <div className="w-full h-[100vh] md:h-[50vh] flex flex-col md:flex-row justify-around items-start md:items-center p-8">
        <WordSlideshow index={index} />
        <CodeBlock index={index} />
      </div>

      <div className={`w-full h-1 bg-gradient-to-br relative next-gradient ${gradients[index]}`}>
        <div className={`absolute z-10 w-full h-1 top-0 left-0 opacity-0 bg-gradient-to-br ${firstLoad ? gradients[0] : gradients?.[index - 1] || gradients[gradients.length - 1]} current-gradient`} />
      </div>

      <div className={`w-full min-h-screen p-8 flex flex-col items-center`} id="showcase">
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
                <div className="text-2xl my-2 font-semibold cursor-default">
                  {project.title}
                </div>
                <div className="font-light italic cursor-default">
                  {project.blurb}
                </div>
              </div>
              <div className="my-2 w-full flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                  {project.mainTools.map(tool => <TooltipDiv
                    className="rounded-full bg-cover bg-center h-8 w-8 shadow-sm border-primary-dark-800 dark:border-primary-light-200 border mr-2"
                    style={{ backgroundImage: `url(${logos.filter(logo => logo.name === tool)[0]?.url})` }}
                    tooltipText={tool}
                    key={v4().slice(0, 9)}
                  />)}
                </div>
                <div className={`${textColors[index]} animate-pulse transition-colors cursor-pointer`} onClick={() => { setSelectedProject(i); setProjectsOpen(true) }}>
                  Read More →
                </div>
              </div>
            </div>
          </div>)}
        </div>

        <div onClick={() => setProjectsOpen(true)} className={`py-8 w-full text-center ${textColors[index]} transition-colors text-xl cursor-pointer underline hover:no-underline`}>
          See all
        </div>
      </div>

      <div className={`w-full min-h-screen border-8 transition-colors flex justify-center ${borderColors[index]}`} id="about">
        <div className="bg-primary-light-200 dark:bg-primary-dark-800 w-full sm:w-4/5 max-w-[50rem] h-full p-4 relative">

          <div className="absolute top-[50%] -translate-y-[50%] right-0 scale-75 sm:scale-100 origin-right w-48 h-80 grid grid-cols-8">
            {padPixels.split("").map((_, i) => <div className={`w-full h-full transition-colors pad-pixelt${i} ${bgColors[index]}`} key={`pix${i}`} />)}
            {pixels.split("").map((_, i) => <div className={`w-full h-full transition-colors pixel${i} ${bgColors[index]}`} key={`pix${i}`} />)}
            {padPixels.split("").map((_, i) => <div className={`w-full h-full transition-colors pad-pixelb${i} ${bgColors[index]}`} key={`pix${i}`} />)}
          </div>

          <div className="font-bold text-2xl py-4">Hey there, Joshua here! 👋🏽</div>

          <span className="">
            &nbsp;&nbsp;&nbsp;I'm a self-taught 21 year old fullstack JavaScript web developer from the USA. 👨🏽‍💻
            I've been coding since my early teens, dabbling in various platforms and technologies such as Scratch, Minecraft, Unity, Lua, and basic web development.
            In January of 2023 I became much more focused on developing my coding skills, and I began teaching myself JavaScript and learning about modern web development practices.
          </span>

          <div className={`font-semibold text-xl pt-8 pb-4 transition-colors ${textColors[index]}`}>Some of my strongest skills 🔥</div>

          <div className="text-lg font-semibold py-2 ml-4">Technologies and tools I've worked with:</div>

          <ul className="list-disc ml-12">
            {[
              "HTML",
              "CSS",
              "JavaScript",
              "TypeScript",
              "Git/GitHub",
              "Node.js",
              "React/React Router",
              "Remix",
              "TailwindCSS",
              "MongoDB",
              "SQL",
              "Express",
              "Vercel",
              "And more!"
            ].map((item, i) => <li key={`li1${i}`} className={`${hoverTextColors[index]} cursor-default transition hover:scale-[102%] hover:translate-x-2`}>
              {item}
            </li>)}
          </ul>

          <div className="text-lg font-semibold pb-2 pt-4 ml-4">Soft Skills:</div>

          <ul className="list-disc ml-12">
            {[
              "Natural Leadership",
              "Very Fast Learner",
              "Strong Intuition/Problem Solving Abilities",
              "Work Ethic"
            ].map((item, i) => <li key={`li1${i}`} className={`${hoverTextColors[index]} cursor-default transition hover:scale-[102%] hover:translate-x-2`}>
              {item}
            </li>)}
          </ul>

          <div className={`font-semibold text-xl pt-8 pb-4 transition-colors ${textColors[index]}`}>A bit more about me! ✨</div>

          <span className="">
            &nbsp;&nbsp;&nbsp;I have had many hobbies over the years, including art, making card/board games, and skill toys like yo-yo. 🎧 🪀
            In my spare time I enjoy listening to music, writing, playing video games, and spending time with family and friends.
            I am the INFP-T personality type!
            I'm also a fundamentalist Christian and do my best to put Jesus first in all I do. ✝ 🙏🏽
          </span>

          <div className="pb-4"></div>
        </div>
      </div>


      <div className="flex flex-col w-full py-16 px-6 justify-center items-center text-center bg-transparent" id="contact">
        <div className="w-full max-w-[50rem] md:w-4/5">
          <div className="italic text-lg md:text-xl">Want to get in touch?</div>
          <form action="mailto:jaypixl95@gmail.com" method="get" encType="text/plain" className="flex flex-col">
            <label htmlFor="subject" className="self-start">Subject:</label>
            <input type="text" name="subject" placeholder="Your Name..." className="p-2 rounded-lg mb-3 bg-white dark:bg-primary-light-200 text-primary-dark-800 border border-primary-dark-950" />

            <label htmlFor="email" className="self-start">Email:</label>
            <input type="email" name="email" placeholder="Your Email..." className="p-2 rounded-lg mb-3 bg-white dark:bg-primary-light-200 text-primary-dark-800 border border-primary-dark-950" />

            <label htmlFor="body" className="self-start">Message:</label>
            <ReactTextareaAutosize
              name="body"
              placeholder="Your Message..."
              minRows={3}
              maxRows={5}
              className="p-2 resize-none rounded-lg mb-8 bg-white dark:bg-primary-light-200 text-primary-dark-800 border border-primary-dark-950"
            ></ReactTextareaAutosize>

            <input type="submit" value="Send" className={`self-center py-2 px-8 font-bold text-xl rounded-md transition hover:scale-105 cursor-pointer ${bgColors[index]}`} />
          </form>
        </div>
      </div>

      <div className={`min-h-[20vh] w-full bg-gradient-to-br overflow-clip relative next-gradient ${gradients[index]}`} id="footer">
        <div className={`absolute z-10 w-full h-full top-0 left-0 opacity-0 bg-gradient-to-br ${firstLoad ? gradients[0] : gradients?.[index - 1] || gradients[gradients.length - 1]} current-gradient`} />
        <div className={`absolute w-full h-full top-0 left-0 z-20 flex flex-col justify-center items-center`}>
          <div className="flex flex-row justify-center items-center">
            {socials.map(acc => <TooltipDiv
              className="h-8 w-8 shadow-sm mx-1 cursor-pointer hover:scale-[105%] transition-transform text-white flex justify-center items-center"
              tooltipText={acc.name}
              size="large"
              key={v4().slice(0, 9)}
            >
              {acc.local ? <LocalLink
                target={acc.url}
              >
                {acc.children}
              </LocalLink> : <Link to={acc.url}>
                {acc.children}
              </Link>}

            </TooltipDiv>)}
          </div>
          <div className="font-light text-sm mt-3 italic text-white">
            Joshua Lawrence Jr. 2023
          </div>
        </div>
      </div>

      {projectsOpen ? <Modal isOpen className="w-full h-full m-8 md:w-2/3 bg-primary-light-200 shadow-xl dark:bg-primary-dark-800 text-primary-dark-800 dark:text-primary-light-200 relative" onClick={() => setProjectsOpen(false)}>
        <div className="absolute top-3 right-3 p-2 cursor-pointer z-40" onClick={() => setProjectsOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </div>

        {projects.map((project, i) => selectedProject === i ? <div className={`rounded-lg w-full shadow-md hover:shadow-xl p-4 transition flex flex-col lg:flex-row my-3 proj${i}`} key={`miniproj${i}`}>

          <div className="h-36 w-60 shrink-0 rounded-md bg-cover bg-center mr-3 lg:m-3 self-center lg:self-start" style={{ backgroundImage: `url(${project.imageUrl})` }} />
          <div className="flex flex-col h-full w-full justify-between mt-3 lg:mt-0 md:ml-3">
            <div>
              <Link to={project.siteLink} className="text-2xl my-2 font-semibold">
                {project.title}
              </Link>
              <Link to={project.siteLink} className="flex flex-row items-center my-1 underline hover:no-underline">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mr-2">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-1.5 0a6.5 6.5 0 11-11-4.69v.447a3.5 3.5 0 001.025 2.475L8.293 10 8 10.293a1 1 0 000 1.414l1.06 1.06a1.5 1.5 0 01.44 1.061v.363a1 1 0 00.553.894l.276.139a1 1 0 001.342-.448l1.454-2.908a1.5 1.5 0 00-.281-1.731l-.772-.772a1 1 0 00-1.023-.242l-.384.128a.5.5 0 01-.606-.25l-.296-.592a.481.481 0 01.646-.646l.262.131a1 1 0 00.447.106h.188a1 1 0 00.949-1.316l-.068-.204a.5.5 0 01.149-.538l1.44-1.234A6.492 6.492 0 0116.5 10z" clipRule="evenodd" />
                </svg>
                <div className="font-light italic">
                  {project.siteLink}
                </div>
              </Link>
              <Link to={project.sourceLink} className="flex flex-row items-center my-1 underline hover:no-underline">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mr-2">
                  <path fillRule="evenodd" d="M6.28 5.22a.75.75 0 010 1.06L2.56 10l3.72 3.72a.75.75 0 01-1.06 1.06L.97 10.53a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0zm7.44 0a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 010-1.06zM11.377 2.011a.75.75 0 01.612.867l-2.5 14.5a.75.75 0 01-1.478-.255l2.5-14.5a.75.75 0 01.866-.612z" clipRule="evenodd" />
                </svg>
                <div className="font-light italic">
                  {project.sourceLink}
                </div>
              </Link>
              <div className="font-light cursor-default my-2">
                {project.longDescription}
              </div>
              <div className="text-lg font-semibold pt-2 pb-1">Skills Demonstrated:</div>
              <ul className="list-disc ml-6">
                {project.skillsDemonstrated.map((item, i) => <li key={`skl${i}`} className={`${hoverTextColors[index]} cursor-default transition hover:scale-[102%] hover:translate-x-2`}>
                  {item}
                </li>)}
              </ul>
            </div>
            <div className="mb-2 mt-4 w-full flex flex-row items-center justify-between">
              <div className="flex flex-row items-center flex-wrap">
                {project.tools.map(tool => <TooltipDiv
                  className="rounded-full bg-cover bg-center h-10 w-10 shadow-sm border-primary-dark-800 dark:border-primary-light-200 border mr-2"
                  style={{ backgroundImage: `url(${logos.filter(logo => logo.name === tool)[0]?.url})` }}
                  tooltipText={tool}
                  key={v4().slice(0, 9)}
                />)}
              </div>
            </div>
          </div>
        </div> : <div className="text-primary-dark-600 hover:text-primary-dark-800 hover:dark:text-primary-light-200 transition-colors rounded-lg w-full shadow-md hover:shadow-xl hover:scale-[101%] p-4 flex flex-row my-3 cursor-pointer" key={`miniproj${i}`} onClick={() => setSelectedProject(i)}>

          <div className="font-bold text-lg">
            {`>`} {project.title}
          </div>

        </div>)}
      </Modal> : ""}

    </div>
  </Layout>
}