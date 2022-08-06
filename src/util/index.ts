import { Strategy } from "../stores/strategy"

export function readImage(file: File) : Promise<HTMLImageElement> {
    return new Promise(resolve => {
        const reader = new FileReader()
        reader.onload = () => {
            const image = new Image()
            image.src = reader.result as string
            image.onload = () => resolve(image)
        }
        reader.readAsDataURL(file)
    })
}

function createCanvasContext(label: string, size: number, container: HTMLElement) : CanvasRenderingContext2D {
    const canvas = document.createElement('canvas')
    const p = document.createElement('p')
    const download = document.createElement('button')

    canvas.width = size
    canvas.height = size

    p.innerText = label

    download.innerText = '下载'
    download.style.marginTop = '15px'
    download.onclick = () => {
        const a = document.createElement('a')
        a.download = Math.random().toString(36).substring(2)
        a.href = canvas.toDataURL()
        a.click()
    }

    /*
        Output is like this:
            <p/>
            <canvas/>
            <download/>
     */
    container.append(p, canvas, download)

    return canvas.getContext('2d')!
}

export function drawImages(image: HTMLImageElement, strategy: Strategy, container: HTMLElement) {
    // Clear the container first.
    container.innerHTML = ''
    // Cut the edges of the image off.
    let unit: number, cutOffsetX = 0, cutOffsetY = 0
    const scale = image.width / image.height
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
        const ctx = createCanvasContext(label, size * unit, container)
        ctx.drawImage(image, unit * offsetX + cutOffsetX, unit * offsetY + cutOffsetY, unit * size, unit * size, 0, 0, unit * size, unit * size)
    }
}