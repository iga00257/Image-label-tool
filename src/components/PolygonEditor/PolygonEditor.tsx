import React, { useEffect, useRef, useState } from 'react'
import SelectBox from '../Input/SelectBox'
const pigSrc = 'https://images.pexels.com/photos/1266446/pexels-photo-1266446.jpeg?auto=compress&cs=tinysrgb&w=800'

interface Point {
  x: number
  y: number
}

interface Polygon {
  points: Point[]
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

const PolygonEditor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [polygons, setPolygons] = useState<Polygon[]>([])
  const [currentPolygon, setCurrentPolygon] = useState<Polygon | null>(null)
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
  // other functions...

  const startDrawing = (event: React.MouseEvent) => {
    const x = event.nativeEvent.offsetX
    const y = event.nativeEvent.offsetY
    if (currentPolygon === null) {
      setCurrentPolygon({ points: [{ x, y }], color: color.current, label: label.current })
    } else {
      setCurrentPolygon({ ...currentPolygon, points: [...currentPolygon.points, { x, y }] })
    }
  }

  const endDrawing = () => {
    if (currentPolygon != null) {
      setPolygons([...polygons, currentPolygon])
      setCurrentPolygon(null)
    }
  }

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    // clear the canvas, draw the image...

    // draw polygons
    polygons.forEach((polygon, index) => {
      ctx.beginPath()
      polygon.points.forEach((point, i) => {
        if (i === 0) {
          ctx.moveTo(point.x, point.y)
        } else {
          ctx.lineTo(point.x, point.y)
        }
      })
      ctx.closePath()
      ctx.fillStyle = polygon.color
      ctx.fill()

      // draw points
      ctx.beginPath()
      polygon.points.forEach((point) => {
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI)
        ctx.moveTo(point.x, point.y) // prevent the circles from being connected
      })
      ctx.fill()

      ctx.stroke()

      // draw label...
      ctx.fillRect(polygon.points[0].x, polygon.points[0].y, ctx.measureText(polygon.label).width ?? 20 + 10, 20) // 在文字周圍留出一些邊距
      ctx.fillStyle = 'white'
      ctx.font = '16px Arial'
      ctx.fillText(polygon.label, polygon.points[0].x + 5, polygon.points[0].y + 15) // 文字留出一些邊距
    })

    // draw the current polygon
    if (currentPolygon != null) {
      ctx.beginPath()
      currentPolygon.points.forEach((point, i) => {
        if (i === 0) {
          ctx.moveTo(point.x, point.y)
        } else {
          ctx.lineTo(point.x, point.y)
        }
      })
      ctx.strokeStyle = color.current
      ctx.stroke()
      if (currentPolygon.points.length > 1) {
        ctx.closePath()
        ctx.fillStyle = color.current
        ctx.fill()
      }
    }
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
  }, [draw, polygons, currentPolygon])

  // other useEffects...
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Enter') {
        endDrawing()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [endDrawing]) // endDrawing should be stable, otherwise you might need to move the definition into a useCallback.
  return (
    <>
      <div className=' mb-5'>
        <SelectBox labelTitle=' Select Your Label' options={options} updateFormValue={({ value }) => { label.current = value }}/>
        <div placeholder='Select Color' className=' my-2'>Select Color</div>
        <input type="color" ref={colorRef} onChange={handleColorChange} />
      </div>
      <img ref={imgRef} src={pigSrc} style={{ display: 'none' }} />
      <canvas
        onClick={startDrawing}
        ref={canvasRef}
      />
    </>
  )
}

export default PolygonEditor
