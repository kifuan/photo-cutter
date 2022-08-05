/**
 * Reads the file to an image.
 * @param {File} file 
 * @return {Promise<HTMLImageElement>}
 */
function readAsImage(file) {
    return new Promise(resolve => {
        const reader = new FileReader()
        reader.onload = () => {
            const image = new Image()
            image.src = reader.result
            image.onload = () => {
                // Keep height:width = 4:3
                image.height = image.width * 4 / 3
                resolve(image)
            }
        }
        reader.readAsDataURL(file)
    })
}

/**
 * Creates a context and append it to the container.
 * @param {string} label the label for the canvas.
 * @param {number} size the size for width and height.
 * @return {CanvasRenderingContext2D} the context.
 */
function createCanvasCtx(label, size) {
    const canvas = document.createElement('canvas')
    const container = document.createElement('div')
    const download = document.createElement('button')
    download.innerText = '下载'
    download.onclick = () => {
        const a = document.createElement('a')
        a.download = label
        a.href = canvas.toDataURL('image/png')
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()
    }
    container.classList.add('container')
    container.appendChild(document.createTextNode(label))
    container.appendChild(canvas)
    container.appendChild(download)
    document.getElementById('canvas-list').appendChild(container)
    canvas.width = size
    canvas.height = size
    return canvas.getContext('2d')
}

async function handleImage() {
    const uploader = document.getElementById('uploader')
    const file = uploader.files[0]
    if (!/^image\//.test(file.type)) {
        alert('你选择的文件不是图片')
        return
    }
    document.getElementById('canvas-list').innerHTML = ''
    const image = await readAsImage(file)
    const u = image.width / 3
    const u2 = u * 2
    const u3 = u * 3
    const left1 = createCanvasCtx('左1', u2)
    left1.drawImage(image, 0, 0, u2, u2, 0, 0, u2, u2)

    const right1 = createCanvasCtx('右1', u)
    right1.drawImage(image, u2, 0, u, u, 0, 0, u, u)

    const right2 = createCanvasCtx('右2', u)
    right2.drawImage(image, u2, u, u, u, 0, 0, u, u)

    const left2 = createCanvasCtx('左2', u)
    left2.drawImage(image, 0, u2, u, u, 0, 0, u, u)

    const middle1 = createCanvasCtx('中1', u)
    middle1.drawImage(image, u, u2, u, u, 0, 0, u, u)

    const right3 = createCanvasCtx('右3', u)
    right3.drawImage(image, u2, u2, u, u, 0, 0, u, u)

    const left3 = createCanvasCtx('左3', u)
    left3.drawImage(image, 0, u3, u, u, 0, 0, u, u)

    const middle2 = createCanvasCtx('中2', u)
    middle2.drawImage(image, u, u3, u, u, 0, 0, u, u)

    const right4 = createCanvasCtx('右4', u)
    right4.drawImage(image, u2, u3, u, u, 0, 0, u, u)
}