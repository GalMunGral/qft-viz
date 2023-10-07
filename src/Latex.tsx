import React, { FC, useEffect, useState } from "react";
import katex from "katex";

const Latex: FC<{ latex: string }> = ({ latex }) => {
  const [html, setHtml] = useState("");
  useEffect(() => {
    setHtml(katex.renderToString(html));
  });
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export Latex