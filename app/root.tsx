import { cssBundleHref } from "@remix-run/css-bundle"
import type { LinksFunction, LoaderFunction, MetaFunction, V2_MetaFunction } from "@remix-run/node"
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react"
import { V2_ErrorBoundaryComponent } from "@remix-run/react/dist/routeModules"
import { useEffect } from "react"

import stylesheet from "~/tailwindcss.css"
import Layout from "./components/layout"
import Navbar from "./components/navbar"
import { bgColors, borderColors } from "./routes/_index"

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { href: "https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap", rel: "stylesheet" },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: stylesheet }
]

export const meta: V2_MetaFunction = () => [
  { name: "title", content: "Joshua Lawrence Jr. - Fullstack Web Developer" },
  { name: "description", content: "Joshua is a Junior Fullstack Web Developer specializing in JavaScript based technologies and frameworks in Node.js such as React, TypeScript, Express, MongoDB, and SQL." },
  { property: "og:type", content: "website" },
  { property: "og:url", content: "https://www.jpxl.dev/" },
  { property: "og:title", content: "Joshua Lawrence Jr. - Fullstack Web Developer" },
  { property: "og:description", content: "Joshua is a Junior Fullstack Web Developer specializing in JavaScript based technologies and frameworks in Node.js such as React, TypeScript, Express, MongoDB, and SQL." },
  { property: "og:image", content: "https://res.cloudinary.com/dvs0gmvvc/image/upload/v1695935009/jpxl-dev_hg0fgz.png" },
  { property: "twitter:card", content: "summary_large_image" },
  { property: "twitter:url", content: "https://www.jpxl.dev/" },
  { property: "twitter:title", content: "Joshua Lawrence Jr. - Fullstack Web Developer" },
  { property: "twitter:description", content: "Joshua is a Junior Fullstack Web Developer specializing in JavaScript based technologies and frameworks in Node.js such as React, TypeScript, Express, MongoDB, and SQL." },
  { property: "twitter:image", content: "https://res.cloudinary.com/dvs0gmvvc/image/upload/v1695935009/jpxl-dev_hg0fgz.png" }
]

export const ErrorBoundary: V2_ErrorBoundaryComponent = () => {
  const error: any = useRouteError()
  console.error(error)

  return <html>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>Something Went Wrong...</title>
      <link rel="icon" href="avatar.png" />
      <Meta />
      <Links />
    </head>
    <body>
      <Layout>
        <div className="w-full h-full max-h-full relative">
          <Navbar index={2} ext />
          <div className="w-full py-12 px-8 flex flex-col items-center justify-center">
            <div className="text-3xl py-4 font-semibold">
              Something Went Wrong...
            </div>
            <div className={`py-3 px-2 border-b ${borderColors[2]}`}>
              <span className="font-semibold text-lg">{error.status} {error.statusText}</span> - <span>{error.data}</span>
            </div>
            <div className="text-xl py-8">
              When life gives you lemons, make lemonade.
            </div>
            <Link to={"/"} className={`px-8 py-2 text-2xl ${bgColors[2]} text-primary-light-200 rounded-lg hover:scale-105 transition`}>
              🍋 Back to Home 🍋
            </Link>
          </div>
        </div>
      </Layout>
      <Scripts />
    </body>
  </html>
}

export default function App() {
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>Joshua Lawrence Jr. - Fullstack Web Developer</title>
      <link rel="icon" href="avatar.png" />
      <Meta />
      <Links />
    </head>
    <body className="overscroll-none">
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
}
