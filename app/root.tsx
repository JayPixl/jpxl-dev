import { cssBundleHref } from "@remix-run/css-bundle"
import type { LinksFunction, LoaderFunction, MetaFunction, V2_MetaFunction } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import { useEffect } from "react"

import stylesheet from "~/tailwindcss.css"

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
  { property: "og:image", content: "https://metatags.io/images/meta-tags.png" },
  { property: "twitter:card", content: "summary_large_image" },
  { property: "twitter:url", content: "https://www.jpxl.dev/" },
  { property: "twitter:title", content: "Joshua Lawrence Jr. - Fullstack Web Developer" },
  { property: "twitter:description", content: "Joshua is a Junior Fullstack Web Developer specializing in JavaScript based technologies and frameworks in Node.js such as React, TypeScript, Express, MongoDB, and SQL." },
  { property: "twitter:image", content: "https://metatags.io/images/meta-tags.png" }
]

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
