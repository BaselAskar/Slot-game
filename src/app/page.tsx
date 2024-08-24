"use client"
import Reel from "@utils/components/Reel"
import SpinButton from "@utils/components/SpinButton"
import Win from "@utils/components/Win"
import { RollResult } from "@utils/models/rollResult"
import { useEffect, useRef, useState } from "react"

export default function Home() {
    const init = useRef<boolean>(false)

    const [stop, setStop] = useState<[boolean, boolean, boolean]>([true, true, true])

    const [result, setResult] = useState<[RollResult, RollResult, RollResult]>([
        {
            value: 0,
            roll: 0,
        },
        {
            value: 0,
            roll: 0,
        },
        {
            value: 0,
            roll: 0,
        },
    ])

    const selectEl = useRef<HTMLSelectElement>(null)

    function submitForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const latestPlay = localStorage.getItem("last_play")

        if (latestPlay) {
            const now = new Date()

            const latestPalyDate = new Date(latestPlay)

            if (now < new Date(latestPalyDate.getTime() + 60000)) {
                console.log("You are not allowed to play ...")
                return
            }
        }

        init.current = true
        setStop([false, false, false])
        ;(async () => {
            if (!selectEl.current) return

            const response = await fetch(`/api/rolls?coins=${selectEl.current.value}`, {
                method: "POST",
            })

            if (response.ok) {
                const data: [RollResult, RollResult, RollResult] = await response.json()

                localStorage.setItem("last_play", new Date().toString())

                setTimeout(() => {})

                setResult(data)
            }
        })()
    }

    return (
        <div className="flex flex-col items-center gap-4">
            {result.every((r, _, arr) => r.value === arr[0].value) && stop.every((s) => s) && init.current && <Win />}
            <div className="slots">
                <Reel onStop={() => setStop((pre) => [true, pre[1], pre[2]])} index={0} result={result} />
                <Reel onStop={() => setStop((pre) => [pre[0], true, pre[2]])} index={1} result={result} />
                <Reel onStop={() => setStop((pre) => [pre[0], pre[1], true])} index={2} result={result} />
            </div>
            <form className="flex flex-col gap-6" onSubmit={submitForm}>
                <SpinButton />
                <select
                    ref={selectEl}
                    defaultValue={1}
                    className="text-black block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                    <option value={1}>1 coin</option>
                    <option value={5}>5 coins</option>
                    <option value={10}>10 coins</option>
                    <option value={20}>20 coins</option>
                    <option value={50}>50 coins</option>
                    <option value={100}>100 coins</option>
                </select>
            </form>
        </div>
    )
}
