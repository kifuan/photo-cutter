interface StrategyStep {
    label: string
    size: number
    offset: [number, number]
}

interface Strategy {
    label: string
    unit: number
    scale: number
    steps: StrategyStep[]
}



type DOMTool = typeof document.querySelector & {
    [tagName: string] : <T extends HTMLElement = HTMLElement>(attrs: {}, ...nodes: (Node | string)[]) => T
}

/**
 * Tool object to process DOMs.
 */
export const dom = new Proxy(document.querySelector.bind(document), {
    get(_, key: string) {
        return (attrs: {}, ...nodes: (Node | string)[]) => {
            const el = document.createElement(key)
            Object.assign(el, attrs)
            el.append(...nodes)
            return el
        }
    }
}) as DOMTool



function readFileAsImage(file: File) : Promise<HTMLImageElement> {
    return new Promise(resolve => {
        const reader = new FileReader()
        reader.onload = () => {
            const image = new Image()
            image.src = reader.result as string
            image.onload = () => {
                resolve(image)
            }
        }
        reader.readAsDataURL(file)
    })
}

/**
 * Generate a random string sized 12.
 */
function randomStr12() : string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    return Array(12).fill(undefined).reduce(result => {
        const randomChar = chars.charAt(Math.floor(Math.random() * chars.length))
        return result + randomChar
    }, '')
}

/**
 * Creates a context and append it to the container.
 * @param label the label for the canvas.
 * @param size the size for width and height.
 * @return the context.
 * 
 */
function createCanvasCtx(label: string, size: number) : CanvasRenderingContext2D {
    const canvas = dom.canvas<HTMLCanvasElement>({ width: size, height: size })
    dom('#canvas-list')!.appendChild(dom.div({},
        dom.p({}, label),
        canvas,
        dom.button({
            innerText: '下载', onclick: () => {
                // Download with a random string to avoid duplicate filenames.
                dom.a({ download: randomStr12(), href: canvas.toDataURL('image/png') }).click()
            }
        })
    ))
    return canvas.getContext('2d')!
}

export async function handleImage() {
    // Read the uploaded file.
    const image = await readFileAsImage(dom<HTMLInputElement>('#uploader')!.files![0])
    const scale = image.width / image.height
    dom<HTMLSpanElement>('#scale')!.innerText = scale.toFixed(2)

    // Clear the canvas list.
    dom<HTMLDivElement>('#canvas-list')!.innerHTML = ''

    const strategy = strategies[dom<HTMLSelectElement>('#strategy')!.value]
    // Cut the edges of the image off.
    let unit: number, cutOffsetX = 0, cutOffsetY = 0
    if (scale > strategy.scale) {
        const idealWidth = image.height * strategy.scale
        unit = idealWidth * strategy.unit
        cutOffsetX = (image.width - idealWidth) / 2
    } else {
        const idealHeight = image.width / strategy.scale
        unit = image.width * strategy.unit
        cutOffsetY = (image.height - idealHeight) / 2
    }
    for (const { label, size, offset: [offsetX, offsetY] } of strategy.steps) {
        const ctx = createCanvasCtx(label, unit * size)
        ctx.drawImage(image, unit * offsetX + cutOffsetX, unit * offsetY + cutOffsetY, unit * size, unit * size, 0, 0, unit * size, unit * size)
    }
}

