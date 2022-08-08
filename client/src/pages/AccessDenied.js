import React from "react";
import CanvasElectro from "../components/CanvasElectro";

export const AccessDenied = () => {

   /* const draw = (ctx,frameCount) => {
        ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(50,100,20*Math.sin(frameCount*0.05)**2,0,2*Math.PI)
        ctx.fill()
    }
*/
    return (
        <>
            <div style={{background: "rgb(30,30,30)"}}>
            <CanvasElectro />
            <h1 className='col-12 text-danger text-center mt-5'>ACCESS DENIED</h1>
            </div>
        </>
    )
}