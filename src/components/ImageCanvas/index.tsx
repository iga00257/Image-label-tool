import pigSrc from '../../assets/pig.jpg'
import React, { useEffect, useRef, useState } from 'react'

const CanvasComponent = () => {
  const canvasRef = useRef(null)
  const [rectangles, setRectangles] = useState([])
  const [startPoint, setStartPoint] = useState(null)
  const img = useRef(null)

  useEffect(() => {
    // 只在組件加載時加載圖片
    img.current = new Image()
    img.current.src = pigSrc // 替換你的圖片URL
    img.current.onload = () => {
      // 畫圖片到canvas
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img.current, 0, 0, ctx.canvas.width, ctx.canvas.height)
    }
  }, [])

  const draw = (ctx, frameCount) => {
    // 清空畫布
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // 畫圖片到canvas
    ctx.drawImage(img.current, 0, 0, ctx.canvas.width, ctx.canvas.height)

    // 畫矩形
    rectangles.forEach(rect => {
      ctx.beginPath()
      ctx.rect(rect.x, rect.y, rect.width, rect.height)
      ctx.stroke()
    })
  }

  const startDrawing = (event) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    setStartPoint({ x, y })
  }

  const endDrawing = (event) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    setRectangles([...rectangles, {
      x: Math.min(startPoint.x, x),
      y: Math.min(startPoint.y, y),
      width: Math.abs(x - startPoint.x),
      height: Math.abs(y - startPoint.y)
    }])
    setStartPoint(null)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId

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
  }, [draw, rectangles])

  return <canvas onMouseDown={startDrawing} onMouseUp={endDrawing} ref={canvasRef} width="500px" height="500px"/>
}

export default CanvasComponent
