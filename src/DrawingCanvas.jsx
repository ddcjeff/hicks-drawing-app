import React, { useState } from "react";

export default function DrawingCanvas() {
  const [shapes, setShapes] = useState([]);
  const [draggingId, setDraggingId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const addShape = () => {
    const newShape = {
      id: Date.now(),
      type: "rect",
      x: 100,
      y: 100,
      width: 100,
      height: 60,
      label: `Box ${shapes.length + 1}`,
    };
    setShapes([...shapes, newShape]);
  };

  const handleMouseDown = (e, id) => {
    const shape = shapes.find((s) => s.id === id);
    if (shape) {
      setOffset({ x: e.clientX - shape.x, y: e.clientY - shape.y });
      setDraggingId(id);
    }
  };

  const handleMouseUp = () => setDraggingId(null);

  const handleMouseMove = (e) => {
    if (draggingId) {
      const updated = shapes.map((shape) =>
        shape.id === draggingId
          ? { ...shape, x: e.clientX - offset.x, y: e.clientY - offset.y }
          : shape
      );
      setShapes(updated);
    }
  };

  const handleRightClick = (e, id) => {
    e.preventDefault();
    setShapes(shapes.filter((shape) => shape.id !== id));
  };

  return (
    <div>
      <div className="toolbar p-2 bg-gray-800 text-white">
        <button onClick={addShape} className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">
          ➕ Add Rectangle
        </button>
      </div>

      <div
        className="canvas w-full h-[80vh] bg-gray-100 relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {shapes.map((shape) => (
          <div
            key={shape.id}
            onMouseDown={(e) => handleMouseDown(e, shape.id)}
            onContextMenu={(e) => handleRightClick(e, shape.id)}
            className="absolute bg-blue-400 rounded shadow cursor-move text-white text-sm flex items-center justify-center"
            style={{
              left: shape.x,
              top: shape.y,
              width: shape.width,
              height: shape.height,
              userSelect: "none",
            }}
          >
            {shape.label}
          </div>
        ))}
      </div>
    </div>
  );
}
