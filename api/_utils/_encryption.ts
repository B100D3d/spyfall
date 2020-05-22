import { range } from "./_index"
import Jimp from "jimp"

interface RGBA {
    r: number;
    g: number;
    b: number;
    a: number;
}

interface Start {
    startWidth: number;
    startHeight: number;
}

const getStartIndexes = (maxX: number, maxY: number, key: string): Start => {
    let startWidth = 0
    let startHeight = 0
    for(const i of range(key.length)) {
        startWidth = (startWidth + key.charCodeAt(i)) % maxX
        startHeight = (startHeight + key.charCodeAt(i)) % maxY
    }
    return { startWidth, startHeight }
}


const getImage = (img: string): Promise<Jimp> => {
    if (img.includes("base64")) {
        return Jimp.read(Buffer.from(img.slice(img.indexOf("base64") + 6), "base64"))
    } else {
        return Jimp.read(img)
    }
}


const getPixelColor = (img: Jimp, x: number, y: number): RGBA => {
    return Jimp.intToRGBA(img.getPixelColor(x, y))
}

const createImage = (width: number, height: number): Jimp => {
    return new Jimp(width, height, "#000000")
}

const putPixelToSolution = (
    solution: Jimp,
    { r, g, b, a }: RGBA,
    x: number,
    y: number): void => {
    const hex = Jimp.rgbaToInt(r, g, b, a)
    solution.setPixelColor(hex, x, y)
}

export const encrypt = async (sourceSrc: string, messageSrc: string, key: string): Promise<string> => {

    const source = await getImage(sourceSrc)
    const message = await getImage(messageSrc)

    const solution = await getImage(sourceSrc)

    const MESSAGE_WIDTH = message.getWidth()
    const MESSAGE_HEIGHT = message.getHeight()
    const SOURCE_WIDTH = source.getWidth()
    const SOURCE_HEIGHT = source.getHeight()

    const { startWidth, startHeight } = getStartIndexes(
        SOURCE_WIDTH - MESSAGE_WIDTH ,
        SOURCE_HEIGHT - MESSAGE_HEIGHT,
        key)


    for (const x of range(MESSAGE_WIDTH)) {
        for (const y of range(MESSAGE_HEIGHT)) {

            const sourcePixel = getPixelColor(source, x + startWidth, y + startHeight)

            const { r: messagePixel } = getPixelColor(message, x, y)

            const encryptPixel = messagePixel ^ key.charCodeAt((x+y) % key.length)

            const [r, g, b] = [
                encryptPixel >> 6,
                (encryptPixel & 0b00111111) >> 3,
                encryptPixel & 0b00000111
            ]


            const solutionPixel = {
                r: Math.min(255, sourcePixel.r + r),
                g: Math.min(255, sourcePixel.g + g),
                b: Math.min(255, sourcePixel.b + b),
                a: 255
            }

            putPixelToSolution(solution, solutionPixel, x + startWidth, y + startHeight)

        }
    }

    return solution.getBase64Async("image/png")
}

export const decrypt = async (sourceSrc: string, secretSrc: string, key: string): Promise<string> => {

    const source = await getImage(sourceSrc)
    const secret = await getImage(secretSrc)

    const MESSAGE_WIDTH = 380
    const MESSAGE_HEIGHT = 380
    const SOURCE_WIDTH = source.getWidth()
    const SOURCE_HEIGHT = source.getHeight()

    const solution = createImage(MESSAGE_WIDTH, MESSAGE_HEIGHT)

    const { startWidth, startHeight } = getStartIndexes(
        SOURCE_WIDTH - MESSAGE_WIDTH,
        SOURCE_HEIGHT - MESSAGE_HEIGHT,
        key)


    for (const x of range(380)) {
        for (const y of range(380)) {

            const sourcePixel = getPixelColor(source, x + startWidth, y + startHeight)

            const secretPixel = getPixelColor(secret, x + startWidth, y + startHeight)

            const [r, g, b] = [
                secretPixel.r - sourcePixel.r,
                secretPixel.g - sourcePixel.g,
                secretPixel.b - sourcePixel.b
            ]

            const encryptionNum = (r << 6) + (g << 3) + b

            const solutionPixelColor = encryptionNum ^ key.charCodeAt((x+y) % key.length)

            const solutionPixel = {
                r: solutionPixelColor,
                g: solutionPixelColor,
                b: solutionPixelColor,
                a: 255
            }

            putPixelToSolution(solution, solutionPixel, x, y)
        }
    }
    return solution.getBase64Async("image/png")
}
