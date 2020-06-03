"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const index_1 = require("./index");
const jimp_1 = __importDefault(require("jimp"));
const getStartIndexes = (maxX, maxY, key) => {
    let startWidth = 0;
    let startHeight = 0;
    for (const i of index_1.range(key.length)) {
        startWidth = (startWidth + key.charCodeAt(i)) % maxX;
        startHeight = (startHeight + key.charCodeAt(i)) % maxY;
    }
    return { startWidth, startHeight };
};
const getImage = (img) => {
    if (img.includes("base64")) {
        return jimp_1.default.read(Buffer.from(img.slice(img.indexOf("base64") + 6), "base64"));
    }
    else {
        return jimp_1.default.read(img);
    }
};
const getPixelColor = (img, x, y) => {
    return jimp_1.default.intToRGBA(img.getPixelColor(x, y));
};
const createImage = (width, height) => {
    return new jimp_1.default(width, height, "#000000");
};
const putPixelToSolution = (solution, { r, g, b, a }, x, y) => {
    const hex = jimp_1.default.rgbaToInt(r, g, b, a);
    solution.setPixelColor(hex, x, y);
};
exports.encrypt = async (sourceSrc, messageSrc, key) => {
    const source = await getImage(sourceSrc);
    const message = await getImage(messageSrc);
    const solution = await getImage(sourceSrc);
    const MESSAGE_WIDTH = message.getWidth();
    const MESSAGE_HEIGHT = message.getHeight();
    const SOURCE_WIDTH = source.getWidth();
    const SOURCE_HEIGHT = source.getHeight();
    const { startWidth, startHeight } = getStartIndexes(SOURCE_WIDTH - MESSAGE_WIDTH, SOURCE_HEIGHT - MESSAGE_HEIGHT, key);
    for (const x of index_1.range(MESSAGE_WIDTH)) {
        for (const y of index_1.range(MESSAGE_HEIGHT)) {
            const sourcePixel = getPixelColor(source, x + startWidth, y + startHeight);
            const { r: messagePixel } = getPixelColor(message, x, y);
            const encryptPixel = messagePixel ^ (key.charCodeAt((x + y) % key.length) % 256);
            const [r, g, b] = [
                encryptPixel >> 6,
                (encryptPixel & 0b00111111) >> 3,
                encryptPixel & 0b00000111
            ];
            const solutionPixel = {
                r: Math.min(255, sourcePixel.r + r),
                g: Math.min(255, sourcePixel.g + g),
                b: Math.min(255, sourcePixel.b + b),
                a: sourcePixel.a
            };
            putPixelToSolution(solution, solutionPixel, x + startWidth, y + startHeight);
        }
    }
    return solution.getBase64Async("image/png");
};
exports.decrypt = async (sourceSrc, secretSrc, key) => {
    const source = await getImage(sourceSrc);
    const secret = await getImage(secretSrc);
    const MESSAGE_WIDTH = 380;
    const MESSAGE_HEIGHT = 380;
    const SOURCE_WIDTH = source.getWidth();
    const SOURCE_HEIGHT = source.getHeight();
    const solution = createImage(MESSAGE_WIDTH, MESSAGE_HEIGHT);
    const { startWidth, startHeight } = getStartIndexes(SOURCE_WIDTH - MESSAGE_WIDTH, SOURCE_HEIGHT - MESSAGE_HEIGHT, key);
    for (const x of index_1.range(380)) {
        for (const y of index_1.range(380)) {
            const sourcePixel = getPixelColor(source, x + startWidth, y + startHeight);
            const secretPixel = getPixelColor(secret, x + startWidth, y + startHeight);
            const [r, g, b] = [
                secretPixel.r - sourcePixel.r,
                secretPixel.g - sourcePixel.g,
                secretPixel.b - sourcePixel.b
            ];
            const encryptionNum = (r << 6) + (g << 3) + b;
            const solutionPixelColor = encryptionNum ^ (key.charCodeAt((x + y) % key.length) % 256);
            const solutionPixel = {
                r: solutionPixelColor,
                g: solutionPixelColor,
                b: solutionPixelColor,
                a: 255
            };
            putPixelToSolution(solution, solutionPixel, x, y);
        }
    }
    return solution.getBase64Async("image/png");
};
