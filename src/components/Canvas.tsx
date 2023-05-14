import useCanvas from '../hooks/useCanvas'

const Canvas = (props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLCanvasElement> & React.CanvasHTMLAttributes<HTMLCanvasElement>) => {
  const draw = (ctx: any, frameCount: any): any => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI)
    ctx.fill()
  }

  const canvasRef = useCanvas(draw)

  return (
    <canvas ref={canvasRef} {...props}/>
  )
}

export default Canvas
