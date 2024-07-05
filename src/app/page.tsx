"use client";
import { useState } from "react";
import { useZxing } from "react-zxing";

export default function Home() {
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });
  return (
    <div className="p-8 h-screen overflow-hidden lg:w-4/5 lg:m-auto bg-home">
      <video ref={ref} />
      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
    </div>
  );
}
