const strategies = {
    qq3x3: {
        label: 'QQ个人资料图片3x3',
        unit: 0.333333,
        scale: 0.75,
        steps: [
            {
                label: '左1',
                size: 2,
                offset: [0, 0]
            },
            {
                label: '右1',
                size: 1,
                offset: [2, 0]
            },
            {
                label: '右2',
                size: 1,
                offset: [2, 1]
            },
            {
                label: '左2',
                size: 1,
                offset: [0, 2]
            },
            {
                label: '中1',
                size: 1,
                offset: [1, 2]
            },
            {
                label: '右3',
                size: 1,
                offset: [2, 2]
            },
            {
                label: '左3',
                size: 1,
                offset: [0, 3]
            },
            {
                label: '中2',
                size: 1,
                offset: [1, 3]
            },
            {
                label: '右4',
                size: 1,
                offset: [2, 3]
            }
        ]
    },
    normal3x3: {
        label: '普通3x3(九宫格)',
        unit: 0.333333,
        scale: 1,
        steps: [
            {
                label: '左1',
                size: 1,
                offset: [0, 0]
            },
            {
                label: '中1',
                size: 1,
                offset: [1, 0]
            },
            {
                label: '右1',
                size: 1,
                offset: [2, 0]
            },
            {
                label: '左2',
                size: 1,
                offset: [0, 1]
            },
            {
                label: '中2',
                size: 1,
                offset: [1, 1]
            },
            {
                label: '右2',
                size: 1,
                offset: [2, 1]
            },
            {
                label: '左3',
                size: 1,
                offset: [0, 2]
            },
            {
                label: '中3',
                size: 1,
                offset: [1, 2]
            },
            {
                label: '右3',
                size: 1,
                offset: [2, 2]
            }
        ]
    },
    normal2x2: {
        label: '普通2x2',
        unit: 0.5,
        scale: 1,
        steps: [
            {
                label: '左1',
                size: 1,
                offset: [0, 0]
            },
            {
                label: '右1',
                size: 1,
                offset: [1, 0]
            },
            {
                label: '左2',
                size: 1,
                offset: [0, 1]
            },
            {
                label: '右2',
                size: 1,
                offset: [1, 1]
            }
        ]
    }
}

/**
 * Tool object to process DOMs.
 */
const dom = new Proxy(document.querySelector.bind(document), {
    get(_, key) {
        return (attrs, ...nodes) => {
            const el = document.createElement(key)
            Object.assign(el, attrs)
            el.append(...nodes)
            return el
        }
    }
})

// Append all strategies by JS.
dom('#strategy').append(...Object.entries(strategies).map(([name, strategy]) => {
    return dom.option({ value: name }, `${strategy.label} 宽高比${strategy.scale.toFixed(2)}`)
}))

/**
 * Reads the file to an image.
 * @param {File} file 
 * @return {Promise<HTMLImageElement>}
 */
function readFileAsImage(file) {
    return new Promise(resolve => {
        const reader = new FileReader()
        reader.onload = () => {
            const image = new Image()
            image.src = reader.result
            image.onload = () => {
                resolve(image)
            }
        }
        reader.readAsDataURL(file)
    })
}

/**
 * Generate a random string with letters.
 * @return {string} a random string with letters.
 */
function randomStr12() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    return Array(12).fill().reduce(result => {
        const randomChar = chars.charAt(Math.floor(Math.random() * chars.length))
        return result + randomChar
    }, '')
}

/**
 * Creates a context and append it to the container.
 * @param {string} label the label for the canvas.
 * @param {number} size the size for width and height.
 * @return {CanvasRenderingContext2D} the context.
 */
function createCanvasCtx(label, size) {
    const canvas = dom.canvas({ width: size, height: size })
    dom('#canvas-list').appendChild(dom.div({},
        dom.p({}, label),
        canvas,
        dom.button({
            innerText: '下载', onclick: () => {
                // Download with a random string to avoid duplicate filenames.
                dom.a({ download: randomStr12(), href: canvas.toDataURL('image/png') }).click()
            }
        })
    ))
    return canvas.getContext('2d')
}

async function handleImage() {
    // Read the uploaded file.
    const image = await readFileAsImage(dom('#uploader').files[0])
    const scale = image.width / image.height
    dom('#scale').innerText = scale.toFixed(2)

    // Clear the canvas list.
    dom('#canvas-list').innerHTML = ''

    const strategy = strategies[dom('#strategy').value]
    // Cut the edges of the image off.
    let unit, cutOffsetX = 0, cutOffsetY = 0
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

function handleSelect() {
    dom('#canvas-list').innerHTML = '暂未数据'
    dom('#uploader').value = ''
    dom('#scale').innerText = ''
}