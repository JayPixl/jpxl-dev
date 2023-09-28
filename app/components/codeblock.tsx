import anime from 'animejs'
import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { textColors } from '~/routes/_index'

interface props {
    index: number
}

const compiler = <div className={"text-cyan-500" || "text-fuchsia-500" || "text-rose-500" || "text-amber-500" || "text-blue-600"} />

export default function CodeBlock({ index }: props) {
    const messages: string[] = [
        ` // ../sample.jsx
{items.map((item, index) => <div key={index}>
  {item.message}
</div>)}`,
        ` // ../person.js
const obj = {
  name: "John Doe",
  age: 23
}`,
        ` // ../checkcolor.js
[
  "red",
  "blue",
  "pink"
].includes(color) ? true : false`,
        ` // ../imports.ts
import { format } from 'package'

const value = format("hello")`
    ]


    const [workingMessage, setWorkingMessage] = useState<string>('test')

    const [displayedMessage, setDisplayedMessage] = useState<React.ReactNode>()

    useEffect(() => {
        setWorkingMessage(() => "")
        let i = 0

        const interval = setInterval(() => {
            if (messages[index]?.[i]) {
                setWorkingMessage(m => messages[index].slice(0, i))
                i++
            } else {
                clearInterval(interval)
            }
        }, 25)

        return () => clearInterval(interval)
    }, [index])

    useEffect(() => {
        let messages: React.ReactNode[] = []
        let escapeChar: string | undefined
        let functionBlock: string | undefined
        let commentBlock: string | undefined
        workingMessage.split('\n').map((line, index) => {
            line.split(" ").map((word, i) => {
                let chars: React.ReactNode[] = i === 0 ? [] : [" "]

                word.split("").map((char, i) => {
                    if (escapeChar) {
                        chars.push(React.createElement("span", { className: "text-rose-500", key: v4().slice(0, 8) }, char))
                        if (char === escapeChar) {
                            escapeChar = undefined
                        }
                    } else if (functionBlock) {
                        chars.push(React.createElement("span", { className: "text-amber-500", key: v4().slice(0, 8) }, char))
                        if (/[\(\}\)\=]/.test(word[i + 1])) functionBlock = undefined
                    }
                    else if (commentBlock) {
                        chars.push(React.createElement("span", { className: "text-primary-dark-600", key: v4().slice(0, 8) }, char))
                    } else {
                        if (/[\"\']/.test(char) && !escapeChar) {
                            escapeChar = char
                            chars.push(React.createElement("span", { className: "text-rose-500", key: v4().slice(0, 8) }, char))
                        } else {
                            if (/\=/g.test(word.slice(i + 1))) {
                                chars.push(React.createElement("span", { className: "text-primary-light-200", key: v4().slice(0, 8) }, char))
                            }
                            else if (/[\(\)\{\}\[\]]/.test(char)) {
                                chars.push(React.createElement("span", { className: "text-fuchsia-500", key: v4().slice(0, 8) }, char))
                            }
                            else if (/\//.test(char) && /\//.test(word[i + 1])) {
                                chars.push(React.createElement("span", { className: "text-primary-dark-600", key: v4().slice(0, 8) }, char))
                                commentBlock = char
                            }
                            else if (/\=/.test(char) && !/\>/.test(word[i + 1])) {
                                chars.push(React.createElement("span", { className: "text-fuchsia-500", key: v4().slice(0, 8) }, char))
                            }
                            else if (/[\<\>]/.test(char) && !/\=/.test(word[i - 1])) {
                                chars.push(React.createElement("span", { className: "text-blue-600", key: v4().slice(0, 8) }, char))
                            }
                            else if (/\./.test(char) && !/\=/.test(word[i - 1])) {
                                chars.push(React.createElement("span", { className: "text-amber-500", key: v4().slice(0, 8) }, char))
                                functionBlock = char
                            }
                            else if (/[0-9]/.test(char)) {
                                chars.push(React.createElement("span", { className: "text-fuchsia-500", key: v4().slice(0, 8) }, char))
                            }
                            else {
                                chars.push(char)
                            }
                        }
                    }

                })


                let workingWord: React.ReactNode = chars.filter(char => typeof char !== "string").length === 0 ? chars.join("") : React.createElement("span", { key: v4().slice(0, 8) }, chars)

                if (/function|const|let|import|from/g.test(word)) {
                    messages.push(React.createElement("span", { className: "text-cyan-500", key: v4().slice(0, 8) }, workingWord))
                }
                else if (/true|false/g.test(word)) {
                    messages.push(React.createElement("span", { className: "text-fuchsia-500", key: v4().slice(0, 8) }, workingWord))
                }
                else if (/\=\>/.test(word)) {
                    messages.push(React.createElement("span", { className: "text-primary-light-200", key: v4().slice(0, 8) }, workingWord))
                }
                else if (/\=/g.test(word)) {
                    messages.push(React.createElement("span", { className: "text-primary-light-200", key: v4().slice(0, 8) }, workingWord))
                }
                else if (/[\<\>]/g.test(word)) {
                    messages.push(React.createElement("span", { className: "text-blue-600", key: v4().slice(0, 8) }, workingWord))
                }

                else {
                    messages.push(workingWord)
                }
            })
            commentBlock = undefined
            messages.push(`\n`)
        })

        messages.pop()
        setDisplayedMessage(m => React.createElement("span", { className: "text-primary-light-200" }, messages))
    }, [workingMessage])

    useEffect(() => {
        anime({
            targets: '.cursor',
            loop: true,
            keyframes: [
                { opacity: 0, duration: 0, delay: 500 },
                { opacity: 1, duration: 0, delay: 500 },
            ]
        })
    }, [])

    return <div className="h-48 bg-primary-dark-900 rounded-lg p-3 border border-primary-dark-950 w-full md:max-w-[20rem] lg:max-w-[30rem] max-w-full font-fira-mono">
        <pre className='whitespace-pre-wrap'>
            {displayedMessage}<span className={`-translate-x-3 cursor ${textColors[index]}`}>|</span>
        </pre>
    </div>
}