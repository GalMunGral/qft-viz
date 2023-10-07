import React, { useState } from "react";
import Latex from "./Latex";

const range = (Q: number) => {
  return Array(Q)
    .fill(0)
    .map((_, i) => i);
};
const App = () => {
  const [L, setL] = useState(3);
  const Q = 2 ** L;

  return (
    <div>
      <Latex latex={`l = ${L}, Q = ${Q}`} />
      <input
        type="range"
        max="10"
        min="1"
        value={L}
        onChange={(e) => setL(+e.target.value)}
      />
      <svg viewBox={`0 0 100 100`}>
        {range(Q).map((x) => (
          <g>
            {range(Q).map((s) => (
              <>
                <rect
                  x={x * (100 / Q)}
                  y={s * (100 / Q)}
                  fill={`rgba(0, 0, 0, ${Math.random()})`}
                ></rect>
                <text>
                  {x} {s}
                </text>
              </>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default App;
