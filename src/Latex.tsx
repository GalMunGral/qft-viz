import React, { FC, useEffect, useState } from "react";
import * as katex from "katex";

const Latex: FC<{ latex: string; inline?: boolean }> = ({
  latex,
  inline = true,
}) => {
  const [html, setHtml] = useState("");
  useEffect(() => {
    setHtml(
      katex.renderToString(latex, {
        throwOnError: false,
      })
    );
  });
  return (
    <span
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        display: inline ? "inline" : "block",
        textAlign: inline ? "start" : "center",
        margin: "10px 0px",
      }}
    />
  );
};

export default Latex;
