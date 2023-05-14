import React, { useEffect, useRef, useState } from 'react'
// import pigSrc from '../../assets/pig.jpg'
import SelectBox from '../Input/SelectBox'
const pigSrc = 'https://images.pexels.com/photos/1266446/pexels-photo-1266446.jpeg?auto=compress&cs=tinysrgb&w=800'

interface Rectangle {
  x: number
  y: number
  width: number
  height: number
  color: string
  label: string
}
const options = [
  { value: '水豚', name: '水豚' },
  { value: '狗', name: '狗' },
  { value: '貓', name: '貓' },
  { value: '鳥', name: '鳥' },
  { value: '石頭', name: '石頭' }
]

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [rectangles, setRectangles] = useState<Rectangle[]>([])
  const [selectedRect, setSelectedRect] = useState<number>(-1)
  const [startPoint, setStartPoint] = useState<{ x: number, y: number } | null>(null)
  const [currentRect, setCurrentRect] = useState<Rectangle | null>(null)
  const label = useRef('Pig')
  const color = useRef('rgba(255, 0, 0, 0.2)')
  const colorRef = useRef<HTMLInputElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const handleColorChange = () => {
    if (colorRef.current == null) {
      return
    }
    const colorNumber = colorRef.current.value
    // 将颜色转换为 RGBA 格式
    const rgbaColor = `
    rgba(${parseInt(colorNumber.slice(1, 3), 16)}, 
    ${parseInt(colorNumber.slice(3, 5), 16)}, 
    ${parseInt(colorNumber.slice(5, 7), 16)}, 
    0.4)`
    color.current = rgbaColor
  }

  useEffect(() => {
    // 只在組件加載時加載圖片
    const img = imgRef.current ?? new Image()
    // img.current = new Image()
    // img.current.src = pigSrc // 替換你的圖片URL
    img.onload = () => {
      const canvas = canvasRef.current ?? new HTMLCanvasElement()
      canvas.width = img.width
      canvas.height = img.height
      // Now you can draw the image onto the canvas
      const ctx = canvas.getContext('2d') ?? new CanvasRenderingContext2D()
      ctx.drawImage(img, 0, 0, img.width, img.height)
      // ... and then draw your shapes ...
    }
  }, [pigSrc])

  const draw = (ctx: any, frameCount: number) => {
    // 清空畫布
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // 畫圖片到canvas
    ctx.drawImage(imgRef.current, 0, 0, ctx.canvas.width, ctx.canvas.height)

    // 畫矩形
    rectangles.forEach((rect, index) => {
      ctx.beginPath()
      ctx.rect(rect.x, rect.y, rect.width, rect.height)
      if (index === selectedRect) {
        // 有邊框
        ctx.strokeStyle = 'rgba(255, 0, 0, 1)' // 紅色，100%透明度
        ctx.fillStyle = rect.color // 當時顏色
      } else {
        ctx.fillStyle = rect.color // 顏色
        // 沒有邊框
        ctx.strokeStyle = 'rgba(255, 0, 0, 0)'
      }
      ctx.fill()
      ctx.stroke()

      // 畫標籤
      ctx.fillStyle = 'black'
      ctx.fillRect(rect.x, rect.y, Number(ctx.measureText(rect.label).width) ?? 20 + 10, 20) // 在文字周圍留出一些邊距
      ctx.fillStyle = 'white'
      ctx.font = '16px Arial'
      ctx.fillText(rect.label, rect.x + 5, rect.y + 15) // 文字留出一些邊距
    })

    // 繪製當前的預覽矩形
    if (currentRect != null) {
      ctx.beginPath()
      ctx.rect(currentRect.x, currentRect.y, currentRect.width, currentRect.height)
      ctx.fillStyle = color.current // 紅色，50%透明度
      ctx.fill()
    }
  }

  const startDrawing = (event: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (canvas == null) return
    // const x = event.clientX - rect.left
    // const y = event.clientY - rect.top
    // setStartPoint({ x, y })
    const x = event.nativeEvent.offsetX
    const y = event.nativeEvent.offsetY
    setStartPoint({ x, y })
    setCurrentRect({ x, y, width: 0, height: 0, label: label.current, color: color.current })
  }
  const selectRect = (event: React.MouseEvent) => {
    const x = event.nativeEvent.offsetX
    const y = event.nativeEvent.offsetY

    const selected = rectangles.findIndex(rect =>
      x >= rect.x && x <= rect.x + rect.width &&
            y >= rect.y && y <= rect.y + rect.height)
    setSelectedRect(selected)
  }

  const drawPreview = (event: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (canvas == null) {
      return
    }
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    if (startPoint != null) {
      setCurrentRect({
        x: Math.min(startPoint.x, x),
        y: Math.min(startPoint.y, y),
        width: Math.abs(x - startPoint.x),
        height: Math.abs(y - startPoint.y),
        color: color.current,
        label: label.current
      })
    }
  }

  const endDrawing = (event: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (canvas == null || startPoint == null) {
      return
    }
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const width = Math.abs(x - startPoint.x)
    const height = Math.abs(y - startPoint.y)

    if (width > 50 && height > 50) { // 檢查矩形的大小
      setRectangles([...rectangles, {
        x: Math.min(startPoint.x, x),
        y: Math.min(startPoint.y, y),
        width,
        height,
        color: color.current,
        label: label.current
      }])
    }

    setStartPoint(null)
    setCurrentRect(null) // 繪製完成後，將當前預覽矩形設為null
  }

  useEffect(() => {
    const canvas = canvasRef.current ?? new HTMLCanvasElement()
    const context = canvas.getContext('2d') ?? new CanvasRenderingContext2D()
    let frameCount = 0
    let animationFrameId: number

    // Render function
    const render = () => {
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw, rectangles, currentRect])

  useEffect(() => {
    const handleDelete = (event: KeyboardEvent): void => {
      console.log(event.key)
      if (event.key === 'Escape' && selectedRect !== -1) {
        setRectangles(rectangles.filter((_, index) => index !== selectedRect))
        setSelectedRect(-1)
      }
    }
    window.addEventListener('keydown', handleDelete)

    return () => {
      window.removeEventListener('keydown', handleDelete)
    }
  }, [selectedRect, rectangles])

  return (
    <>
    <div className=' mb-5'>
    <SelectBox labelTitle=' Select Your Label' options={options} updateFormValue={({ value }) => { label.current = value }}/>
    <div placeholder='Select Color' className=' my-2'>Select Color</div>
    <input type="color" ref={colorRef} onChange={handleColorChange} />
    </div>
    <img ref={imgRef} src={pigSrc} style={{ display: 'none' }} />
    <canvas
    onMouseDown={startDrawing}
    onMouseUp={endDrawing}
    onClick={selectRect}
    onMouseMove={drawPreview}
    ref={canvasRef}
   />
    </>
  )
}

export default CanvasComponent
