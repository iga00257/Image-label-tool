import './App.css'
// import CanvasComponent from './components/ImageCanvas'
import CanvasComponent from './components/ImageCanvas/Rect-Canvas'
import RectEditor from './components/Rect-Editor/Rect-Editor'
import PolygonEditor from './components/PolygonEditor/PolygonEditor'

function App () {
  return (
    <div className=' w-[100vw] h-[100vh] flex flex-col items-center justify-center'>
      <h1>Canvas Title</h1>
      <div className=' w-1/2 h-1/2'>
        {/* <RectEditor/> */}
        <PolygonEditor/>
      </div>
    </div>
  )
}

export default App
