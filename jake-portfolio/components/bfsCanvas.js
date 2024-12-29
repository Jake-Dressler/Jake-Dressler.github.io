import React, { useEffect, useRef } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Drawing logic here 
    context.fillStyle = 'green';
    context.fillRect(10, 10, 100, 100);

  }, []);

  return (
    <canvas ref={canvasRef} id="bfsCanvas" width={400} height={400} />
  );
};

export default Canvas;