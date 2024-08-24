import { NextApiRequest, NextApiResponse } from "next"

import { Prize } from "@utils/models/prize"
import { RollResult } from "@utils/models/rollResult"
import crypto from "crypto"

const MAX_INDEX = 8
const MIN_ROLL = 5
const MAX_ROLL = 20

const prizes: Prize[] = [
    { coins: 1, chance: 20 },
    { coins: 5, chance: 20 },
    { coins: 10, chance: 20 },
    { coins: 20, chance: 20 },
    { coins: 50, chance: 15 },
    { coins: 100, chance: 5 },
]

const handle = (
    req: NextApiRequest,
    res: NextApiResponse<[RollResult, RollResult, RollResult] | { message: string }>,
) => {
    if (req.method === "POST") {
        const result = crypto.randomInt(0, 100)

        const coins = Number.parseInt(req.query.coins as string)

        const chance = prizes.find((ch) => ch.coins === coins)?.chance

        if (!chance) {
            res.status(400).json({ message: "Invalid coins" })
            return
        }

        const win = result >= 100 - chance

        if (win) {
            const winIndex = crypto.randomInt(0, MAX_INDEX)

            res.status(200).json([
                {
                    value: winIndex,
                    roll: Math.round(Math.random() * (MAX_ROLL - MIN_ROLL) + MIN_ROLL),
                },
                {
                    value: winIndex,
                    roll: Math.round(Math.random() * (MAX_ROLL - MIN_ROLL) + MIN_ROLL),
                },
                {
                    value: winIndex,
                    roll: Math.round(Math.random() * (MAX_ROLL - MIN_ROLL) + MIN_ROLL),
                },
            ])
        } else {
            const firstIndex = crypto.randomInt(0, MAX_INDEX)

            let secondIndex = crypto.randomInt(0, MAX_INDEX)

            while (firstIndex === secondIndex) {
                secondIndex = crypto.randomInt(0, MAX_INDEX)
            }

            let thirdIndex = crypto.randomInt(0, MAX_INDEX)

            while (firstIndex === thirdIndex || secondIndex === thirdIndex) {
                thirdIndex = crypto.randomInt(0, MAX_INDEX)
            }

            res.status(200).json([
                {
                    value: firstIndex,
                    roll: Math.round(Math.random() * (MAX_ROLL - MIN_ROLL) + MIN_ROLL),
                },
                {
                    value: secondIndex,
                    roll: Math.round(Math.random() * (MAX_ROLL - MIN_ROLL) + MIN_ROLL),
                },
                {
                    value: thirdIndex,
                    roll: Math.round(Math.random() * (MAX_ROLL - MIN_ROLL) + MIN_ROLL),
                },
            ])
        }
    } else {
        res.status(405).json({ message: "Method not allowed" })
    }
}

export default handle
