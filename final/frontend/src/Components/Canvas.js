import React, { useRef, useEffect, useState } from 'react'
import pencil from "../Images/pencil.png"
import eraser from "../Images/eraser.png"
import broom from "../Images/broom.png"
import "../App.css"

const Canvas = () => {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [mode, setMode] = useState('pencil')
    const [color, setColor] = useState('black')
    const handleMouseMove = (e)=>{
        if(!isDrawing){
            return
        }
        const {pageX, pageY} = e
        const offsetX = canvasRef.current.offsetLeft
        const offsetY = canvasRef.current.offsetTop
        if(mode === 'pencil'){
            contextRef.current.lineTo((pageX-offsetX)/2, (pageY-offsetY)/2)
            contextRef.current.stroke()
        }else if(mode === 'eraser'){
            contextRef.current.clearRect((pageX-offsetX)/2, (pageY-offsetY)/2, 5, 5)
        }
    }
    const handleMouseDown = (e)=>{
        const {pageX, pageY} = e
        contextRef.current.beginPath()
        const offsetX = canvasRef.current.offsetLeft
        const offsetY = canvasRef.current.offsetTop
        if(mode === 'pencil'){
            contextRef.current.lineTo((pageX-offsetX)/2, (pageY-offsetY)/2)
        }
        setIsDrawing(true)
    }
    const handleMouseUp = (e)=>{
        contextRef.current.closePath()
        setIsDrawing(false)
    }
    const handleChange = (e)=>{
        setColor(e.target.value)
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
        context.strokeStyle = color
        context.lineWidth = 1;
        contextRef.current = context
    },[])
    useEffect(()=>{
        contextRef.current.strokeStyle = color
    }, [color])
    return (
        <div className='Canvas'>
        <div className='toolbar'>
        <img src={pencil} width="30" height="30" onClick={()=>{setMode('pencil')}}/>
        <img src={eraser} width="30" height="30" onClick={()=>{setMode('eraser')}}/>
        <img src={broom} width="30" height="30" onClick={()=>{contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)}} />
        <input type="color" id="color_picker" onChange={handleChange}/>
        </div>
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