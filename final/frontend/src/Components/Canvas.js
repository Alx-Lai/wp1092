import React, { useRef, useEffect, useState } from 'react'
import "../App.css"

const Canvas = () => {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const handleMouseMove = (e)=>{
        if(!isDrawing){
            return
        }
        const {pageX, pageY} = e
        const offsetX = canvasRef.current.offsetLeft
        const offsetY = canvasRef.current.offsetTop
        contextRef.current.lineTo((pageX-offsetX)/2, (pageY-offsetY)/2)
        contextRef.current.stroke()
    }
    const handleMouseDown = (e)=>{
        const {pageX, pageY} = e
        contextRef.current.beginPath()
        const offsetX = canvasRef.current.offsetLeft
        const offsetY = canvasRef.current.offsetTop
        contextRef.current.lineTo((pageX-offsetX)/2, (pageY-offsetY)/2)
        setIsDrawing(true)
    }
    const handleMouseUp = (e)=>{
        contextRef.current.closePath()
        setIsDrawing(false)
    }
    useEffect(()=>{
        const canvas = canvasRef.current;
        canvas.width = 626.670;
        canvas.height = 374;
        canvas.style.width = `${canvas.width}px`;
        canvas.style.height = `${canvas.height}px`;
        const context = canvas.getContext("2d")
        context.scale(2,2)
        context.lineCap = "round"
        context.strokeStyle = 'black'
        context.lineWidth = 1;
        contextRef.current = context
    },[])
  
    return (
        <div className='Canvas'>
        <canvas
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            ref={canvasRef}
        />
        </div>
    )
}

export default Canvas