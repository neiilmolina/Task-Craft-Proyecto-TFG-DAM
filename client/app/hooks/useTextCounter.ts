import { useState, useEffect } from "react";

export const useTextCounter = (string: string) => {
  const [length, setLength] = useState<number>(string.length);
  useEffect(() => {
    setLength(string.length);
  }, [string]);

  return { length };
};
