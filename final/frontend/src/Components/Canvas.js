
import React, { useRef, useEffect, useState } from 'react'
import "../App.css"

const r = 5
const Canvas = () => {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const handleMouseMove = (e)=>{
        if(!isDrawing){
            return
        }
        const {offsetX, offsetY} = e
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
        console.log('draw')
    }
    const handleMouseDown = (e)=>{
        const {offsetX, offsetY} = e
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX,offsetY)
        setIsDrawing(true)
    }
    const handleMouseUp = (e)=>{
        contextRef.current.closePath()
        setIsDrawing(false)
    }
    useEffect(()=>{
        const canvas = canvasRef.current;
        //canvas.width = window.innerWidth * 2;
        //canvas.height = window.innerHeight * 2;
        //canvas.style.width = `${window.innerWidth}px` ;
        //canvas.style.height = `${window.innerHeight}px`;
        const context = canvas.getContext("2d")
        context.scale(2,2)
        context.lineCap = "round"
        context.strokeStyle = 'black'
        context.lineWidth = 5;
        contextRef.current = context
    },[])
  
    return (
        <canvas ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        />
    )
}

export default Canvas