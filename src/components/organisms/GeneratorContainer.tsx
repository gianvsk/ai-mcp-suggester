"use client"

import { useState } from "react"
import { List } from "../molecules/List"
import { useToDo } from "@/app/hooks/useToDo"

export const GeneratorContainer = () => {

    const [text, setText] = useState('')
    const { addElement } = useToDo()

    return (
        <div className="flex flex-col gap-3 border rounded-2xl border-white/80 px-3 py-2">
            <List />
            <div>
                <input onChange={(e) => setText(e.target.value)} className="text h-4 w-full bg-white text-black py-1 px-3 border border-white" />
                <button className="text-white" onClick={() => addElement(text)}>Aggiungi</button>
            </div>
        </div>
    )

}