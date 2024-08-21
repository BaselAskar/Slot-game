/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react"
import styles from "./Reel.module.css"
import reelImg from "@utils/assets/slot_game_img.png"
import { RollResult } from "@utils/models/rollResult"

const maxIndex = 8
const timePerIcon = 100
const iconHeight = reelImg.height / 9
const reelHeigh = 9 * iconHeight

interface Props {
    index: number
    result: [RollResult, RollResult, RollResult]
    onStop: () => void
}

const Reel = (props: Props) => {
    const init = useRef<boolean>(false)

    const [position, setPosition] = useState<number>(0)

    const oldValue = useRef<number>(0)

    const value = props.result[props.index].value
    const roll = props.result[props.index].roll

    const time = 9 * roll * timePerIcon + (value - oldValue.current) * timePerIcon

    useEffect(() => {
        if (!init.current) {
            init.current = true
            return
        }

        const timer = setTimeout(props.onStop, time)

        setPosition((old) => old + reelHeigh * roll + (value - oldValue.current) * iconHeight)

        return () => {
            clearTimeout(timer)
            oldValue.current = value
        }
    }, [props.result])

    return (
        <div
            className={styles.reel}
            style={{
                backgroundImage: `url(${reelImg.src})`,
                backgroundPositionY: `${position}px`,
                transition: `background-position-y ${time}ms`,
            }}
        ></div>
    )
}

export default Reel
