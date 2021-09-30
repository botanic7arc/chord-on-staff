import React from "react";

// canvasを使い五線譜を描く
export const FiveLines = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(
    null
  );

  React.useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext("2d");

      if (renderCtx) {
        setContext(renderCtx);
      }
    }

    if (context) {
      context.fillRect(0, 40, 180, 1);
      context.fillRect(0, 52, 180, 1);
      context.fillRect(0, 64, 180, 1);
      context.fillRect(0, 76, 180, 1);
      context.fillRect(0, 88, 180, 1);
    }
  }, [context]);

  return (
    <div className="FiveLines">
      <canvas className="canvas" ref={canvasRef}></canvas>
    </div>
  );
};
