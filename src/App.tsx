import React, { useState } from "react";
import Latex from "./Latex";
import "./style.css";

const range = (Q: number) => {
  return Array(Q)
    .fill(0)
    .map((_, i) => i);
};

const opacity = (v: number, start: number, end: number, minOpacity = 0.1) => {
  return minOpacity + ((1 - minOpacity) * (v - start)) / (end - start);
};
const color = ([r, g, b]: [number, number, number], opacity: number) => {
  return `rgba(${Math.floor(r * 255)}, ${Math.floor(g * 255)}, ${Math.floor(
    b * 255
  )}, ${opacity})`;
};

const App = () => {
  const [logQ, setLogQ] = useState(4);
  const [logP, setLogP] = useState(2);
  const [X, setX] = useState(0);
  const Q = 2 ** logQ;
  const P = 2 ** logP;

  return (
    <div>
      <div className="row">
        <input
          style={{ width: 200 }}
          type="range"
          min="0"
          max="5"
          value={logQ}
          onChange={(e) => setLogQ(+e.target.value)}
        />
        <Latex latex={`Q = ${Q}`} />
      </div>
      <div className="row">
        <input
          style={{ width: 200 }}
          type="range"
          min={0}
          max={logQ}
          value={logP}
          onChange={(e) => setLogP(+e.target.value)}
        />
        <Latex latex={`P = ${P}`} />
      </div>
      <div className="row">
        <input
          style={{ width: 200 }}
          type="range"
          min={0}
          max={Q - 1}
          value={X}
          onChange={(e) => setX(+e.target.value)}
        />
        <Latex latex={`x_0 = ${X}`} />
      </div>
      <div className="main">
        <div>
          <svg
            id="fourier-basis"
            viewBox="0 0 1000 1000"
            width="400"
            height="400"
          >
            {range(Q).map((s) => (
              <g key={s}>
                {range(Q).map((x) => (
                  <g key={`${s},${x}`}>
                    <rect
                      x={x * (1000 / Q)}
                      y={s * (1000 / Q)}
                      width={1000 / Q}
                      height={1000 / Q}
                      fill={color(
                        s % (Q / P) == 0 ? [1, 0, 0] : [0, 0, 0],
                        opacity(Math.cos(-(2 * Math.PI * s * x) / Q), -1, 1)
                      )}
                    ></rect>
                    P
                    {/* <text>
                  {x} {s}
                </text> */}
                  </g>
                ))}
              </g>
            ))}
          </svg>
          <p>
            Here, row <Latex latex="s" /> represent the <Latex latex="s" />
            -th Fourier basis vector
            <Latex
              inline={false}
              latex="\displaystyle \vert v_s \rangle = \frac{1}{\sqrt{Q}}\sum_{x = 0}^{Q - 1} \omega_{Q}^{-sx} \vert x \rangle,"
            />
          </p>
          <p>
            and the <Latex latex="l" />
            -th highlighed row is
            <Latex
              inline={false}
              latex="\displaystyle \left\vert v_{l\frac{Q}{P}} \right\rangle = \frac{1}{\sqrt{Q}}\sum_{x = 0}^{Q - 1} \omega_{Q}^{-l\frac{Q}{P}x} \vert x \rangle,"
            />
            where <Latex latex="0 \leq l < P" />.
          </p>
        </div>
        <div>
          <svg id="qft" viewBox="0 0 1000 1000" width="400" height="400">
            {range(Q).map((s) => (
              <g key={s}>
                {range(Q).map((x) => (
                  <rect
                    key={x}
                    x={x * (1000 / Q)}
                    y={s * (1000 / Q)}
                    width={1000 / Q}
                    height={1000 / Q}
                    fill={color(
                      x == X && s % (Q / P) == 0 ? [1, 0, 0] : [0, 0, 0],
                      opacity(Math.cos((2 * Math.PI * s * x) / Q), -1, 1)
                    )}
                  ></rect>
                ))}
              </g>
            ))}
          </svg>
          <p>
            By setting appropriate Fourier coefficients, we can construct any
            vector in the standard basis.
          </p>
          <p>
            For example, for the Fourier basis vectors highlighted on the left,
            we could pick the coefficients from the corresponding rows in the{" "}
            <Latex latex="QFT_Q" /> matrix. For other coefficients, we just
            leave them as zeros.
          </p>
          <p>
            Here, the <Latex latex="l" />
            -th highlighted element is what pick as the Fourier coefficient
            <Latex
              inline={false}
              latex="\displaystyle \hat{f}\left(l\frac{Q}{P}\right) = \omega_Q^{l\frac{Q}{P}x_0}."
            />
            .
          </p>
        </div>
        <div>
          <svg
            id="standard"
            viewBox="0 0 1000 100"
            width="400"
            height="40"
            style={{ position: "absolute", top: -50, width: 400, height: 40 }}
          >
            {range(Q).map((x) => {
              let v = 0;
              for (let l = 0; l < P; ++l) {
                const s = l * (Q / P);
                v += Math.cos((2 * Math.PI * s * (X - x)) / Q);
              }
              v /= Math.sqrt(P);
              return (
                <rect
                  key={x}
                  x={x * (1000 / Q)}
                  y={0}
                  width={1000 / Q}
                  height={100}
                  fill={color([0, 0, 1], opacity(v, 0, 1, 0))}
                ></rect>
              );
            })}
          </svg>
          <svg
            id="fourier"
            viewBox="0 0 100 1000"
            width="40"
            height="400"
            style={{ position: "absolute", right: -50, width: 40, height: 400 }}
          >
            {range(Q).map((s) => (
              <rect
                key={s}
                x={0}
                y={s * (1000 / Q)}
                width={100}
                height={1000 / Q}
                fill={color(
                  s % (Q / P) == 0 ? [0, 0, 1] : [1, 1, 1],
                  opacity(Math.cos((2 * Math.PI * s * X) / Q), -1, 1)
                )}
              ></rect>
            ))}
          </svg>
          <svg id="components" viewBox="0 0 1000 1000" width="400" height="400">
            {range(Q).map((s) => (
              <g key={s}>
                {range(Q).map((x) => (
                  <rect
                    key={x}
                    x={x * (1000 / Q)}
                    y={s * (1000 / Q)}
                    width={1000 / Q}
                    height={1000 / Q}
                    fill={color(
                      s % (Q / P) == 0 ? [1, 0, 0] : [1, 1, 1],
                      opacity(Math.cos((2 * Math.PI * s * (-x + X)) / Q), -1, 1)
                    )}
                  ></rect>
                ))}
              </g>
            ))}
          </svg>

          <p>
            The vector we constructed, expressed in the standard basis, is
            <Latex
              inline={false}
              latex="\displaystyle \vert \psi \rangle = \frac{1}{\sqrt{P}} \sum_{l = 0}^{P - 1} \hat{f}\left(l\frac{Q}{P}\right) \left\vert v_{l\frac{Q}{P}} \right\rangle"
            />
            <Latex
              inline={false}
              latex="\displaystyle= \frac{1}{\sqrt{PQ}} \sum_{x = 0}^{Q - 1} \left[ \sum_{l = 0}^{P - 1} \omega_{Q}^{l\frac{Q}{P}(x_0 -x)} \right] \vert x \rangle"
            />
            <Latex
              inline={false}
              latex="\displaystyle= \sqrt{\frac{P}{Q}} \sum_{k = 0}^{\frac{Q}{P} - 1} \vert x_0 + kP \rangle."
            />
            Notice how Fourier transform converts translations in the "time
            domain" (the standard basis) to phase shifts in the "frequency
            domain" (the Fourier basis).
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
