import { range } from "./index";

interface PixelColor {
    r: number;
    g: number;
    b: number;
}

type CompleteFunction = (result: string) => void

export default class Encryption {

    private MESSAGE_WIDTH = 0
    private MESSAGE_HEIGHT = 0
    private SOURCE_WIDTH = 0
    private SOURCE_HEIGHT = 0

    private readonly sourceCtx: CanvasRenderingContext2D | null

    private readonly secretCtx: CanvasRenderingContext2D | null

    private messageCtx: CanvasRenderingContext2D | null = null

    private readonly solverCtx: CanvasRenderingContext2D | null

    private pendingSolution: ImageData | undefined
    private result: string | undefined

    public onComplete: CompleteFunction = () => null

    constructor() {

        const { SOURCE_WIDTH, SOURCE_HEIGHT } = this

        this.sourceCtx = Encryption.createCanvas(SOURCE_WIDTH, SOURCE_HEIGHT).getContext("2d")
        this.secretCtx = Encryption.createCanvas(SOURCE_WIDTH, SOURCE_HEIGHT).getContext("2d")
        this.solverCtx = Encryption.createCanvas(SOURCE_WIDTH, SOURCE_HEIGHT).getContext("2d")

        if(!(this.sourceCtx && this.secretCtx && this.solverCtx)) throw new Error("No context")

    }

    private getSourcePixelColor = (x: number, y: number): PixelColor => Encryption.getPixelColor(this.sourceCtx!, x, y)
    private getMessagePixelColor = (x: number, y: number): PixelColor => Encryption.getPixelColor(this.messageCtx!, x, y)
    private getSecretPixelColor = (x: number, y: number): PixelColor => Encryption.getPixelColor(this.secretCtx!, x, y)

    private static createCanvas(width: number, height: number): HTMLCanvasElement {
        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height
        return canvas
    }

    private static clearCanvas = (ctx: CanvasRenderingContext2D): void => (
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height))

    private static resizeCanvas(ctx: CanvasRenderingContext2D, width: number, height: number): void {
        Encryption.clearCanvas(ctx)
        ctx.canvas.width = width
        ctx.canvas.height = height
    }

    private static drawImage(ctx: CanvasRenderingContext2D, img: HTMLImageElement): void {
        const { width, height } = ctx.canvas
        ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height)
    }


    private static getPixelColor(ctx: CanvasRenderingContext2D, x: number, y: number): PixelColor {
        const [r, g, b] = Array.from(ctx.getImageData(x, y, 1, 1).data)
        return { r, g, b }
    }

    private putPixelToSolution(
        { r, g, b }: Record<string, number>,
        x: number,
        y: number): void {

        const { SOURCE_WIDTH: width, SOURCE_HEIGHT: height } = this
        if(!this.pendingSolution) {
            this.pendingSolution = this.solverCtx!.getImageData(0, 0, width, height)
            setTimeout(() => {
                this.solverCtx!.putImageData(this.pendingSolution!, 0, 0);
                this.result = this.solverCtx!.canvas.toDataURL("image/png")
                this.pendingSolution = undefined

                this.onComplete(this.result)
            })
        }

        this.pendingSolution.data[(y * width + x) * 4] = r;
        this.pendingSolution.data[(y * width + x) * 4 + 1] = g;
        this.pendingSolution.data[(y * width + x) * 4 + 2] = b;
        this.pendingSolution.data[(y * width + x) * 4 + 3] = 255;
    }

    encrypt(sourceImg: HTMLImageElement, message: HTMLCanvasElement, key: string): void {

        this.MESSAGE_WIDTH = message.width
        this.MESSAGE_HEIGHT = message.height
        this.SOURCE_WIDTH = sourceImg.naturalWidth
        this.SOURCE_HEIGHT = sourceImg.naturalHeight

        this.messageCtx = message.getContext("2d")

        if(!this.messageCtx) throw new Error("No message context")

        Encryption.resizeCanvas(this.solverCtx!, this.SOURCE_WIDTH, this.SOURCE_HEIGHT)
        Encryption.resizeCanvas(this.sourceCtx!, this.SOURCE_WIDTH, this.SOURCE_HEIGHT)
        Encryption.drawImage(this.sourceCtx!, sourceImg)
        Encryption.drawImage(this.solverCtx!, sourceImg)

        const {
            getSourcePixelColor,
            getMessagePixelColor,
            MESSAGE_WIDTH,
            MESSAGE_HEIGHT
        } = this

        for (const x of range(MESSAGE_WIDTH)) {
            for (const y of range(MESSAGE_HEIGHT)) {

                const sourcePixel = getSourcePixelColor(x, y)

                const { r: messagePixel } = getMessagePixelColor(x, y)

                const encryptPixel = messagePixel ^ key.charCodeAt((x+y) % key.length)

                const [r, g, b] = [
                    encryptPixel >> 6,
                    (encryptPixel & 0b00111111) >> 3,
                    encryptPixel & 0b00000111
                ]


                const solutionPixel = { r: sourcePixel.r + r, g: sourcePixel.g + g, b: sourcePixel.b + b }

                this.putPixelToSolution(solutionPixel, x, y)

            }
        }
    }

    decrypt(sourceImg: HTMLImageElement, secretImg: HTMLImageElement, key: string): void {

        this.SOURCE_WIDTH = sourceImg.naturalWidth
        this.SOURCE_HEIGHT = sourceImg.naturalHeight

        Encryption.resizeCanvas(this.solverCtx!, 380, 380)
        Encryption.resizeCanvas(this.sourceCtx!,  this.SOURCE_WIDTH, this.SOURCE_HEIGHT)
        Encryption.resizeCanvas(this.secretCtx!,  this.SOURCE_WIDTH, this.SOURCE_HEIGHT)
        Encryption.drawImage(this.sourceCtx!, sourceImg)
        Encryption.drawImage(this.secretCtx!, secretImg)

        const {
            getSourcePixelColor,
            getSecretPixelColor
        } = this

        for (const x of range(380)) {
            for (const y of range(380)) {

                const sourcePixel = getSourcePixelColor(x, y)

                const secretPixel = getSecretPixelColor(x, y)

                const [r, g, b] = [
                    secretPixel.r - sourcePixel.r,
                    secretPixel.g - sourcePixel.g,
                    secretPixel.b - sourcePixel.b
                ]

                const encryptionNum = (r << 6) + (g << 3) + b

                const solutionPixelColor = encryptionNum ^ key.charCodeAt((x+y) % key.length)

                const solutionPixel = { r: solutionPixelColor, g: solutionPixelColor, b: solutionPixelColor }

                this.putPixelToSolution(solutionPixel, x, y)
            }
        }
    }

}