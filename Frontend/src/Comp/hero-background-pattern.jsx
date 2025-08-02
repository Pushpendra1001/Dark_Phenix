const HeroBackgroundPattern = () => {
  const gridSize = 20 // Number of lines/dots in the grid
  const svgWidth = 1000
  const svgHeight = 600
  const cellWidth = svgWidth / gridSize
  const cellHeight = svgHeight / gridSize

  const lines = []
  const circles = []

  // Generate horizontal and vertical lines
  for (let i = 0; i <= gridSize; i++) {
    // Horizontal lines
    lines.push(
      <line
        key={`h-${i}`}
        x1={0}
        y1={i * cellHeight}
        x2={svgWidth}
        y2={i * cellHeight}
        stroke="#2e2e30"
        strokeWidth="0.5"
        className="opacity-20 animate-draw-line"
        style={{ animationDelay: `${i * 0.05}s` }}
      />,
    )
    // Vertical lines
    lines.push(
      <line
        key={`v-${i}`}
        x1={i * cellWidth}
        y1={0}
        x2={i * cellWidth}
        y2={svgHeight}
        stroke="#2e2e30"
        strokeWidth="0.5"
        className="opacity-20 animate-draw-line"
        style={{ animationDelay: `${(i + gridSize) * 0.05}s` }}
      />,
    )
  }

  // Generate diagonal lines and circles at intersections
  for (let i = 0; i <= gridSize; i++) {
    for (let j = 0; j <= gridSize; j++) {
      const cx = i * cellWidth
      const cy = j * cellHeight

      // Circles at intersections
      circles.push(
        <circle
          key={`c-${i}-${j}`}
          cx={cx}
          cy={cy}
          r="1.5"
          fill="#fd594e"
          className="opacity-30 animate-fade-in"
          style={{ animationDelay: `${i * j * 0.01 + 1}s` }}
        />,
      )

      // Random diagonal lines (sparse)
      if (Math.random() < 0.1) {
        // Adjust density
        const direction = Math.random() > 0.5 ? 1 : -1
        lines.push(
          <line
            key={`d-${i}-${j}`}
            x1={cx}
            y1={cy}
            x2={cx + cellWidth * direction}
            y2={cy + cellHeight * direction}
            stroke="#fd594e"
            strokeWidth="0.5"
            className="opacity-10 animate-draw-line"
            style={{ animationDelay: `${i * j * 0.02 + 2}s` }}
          />,
        )
      }
    }
  }

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <style>
          {`
            @keyframes draw-line {
              0% {
                stroke-dasharray: 0 1000;
                opacity: 0;
              }
              50% {
                stroke-dasharray: 1000 1000;
                opacity: 0.2;
              }
              100% {
                opacity: 0.2;
              }
            }
            @keyframes fade-in {
              0% { opacity: 0; }
              100% { opacity: 0.3; }
            }
            .animate-draw-line {
              animation: draw-line 3s ease-out forwards;
            }
            .animate-fade-in {
              animation: fade-in 1s ease-out forwards;
            }
          `}
        </style>
      </defs>
      {lines}
      {circles}
    </svg>
  )
}

export default HeroBackgroundPattern
