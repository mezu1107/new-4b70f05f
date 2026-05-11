import { useEffect, useState } from "react";

export const Typewriter = ({ words, className = "" }: { words: string[]; className?: string }) => {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    const speed = del ? 40 : 80;
    const t = setTimeout(() => {
      if (!del) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setTimeout(() => setDel(true), 1400);
      } else {
        const next = word.slice(0, text.length - 1);
        setText(next);
        if (next === "") { setDel(false); setI(i + 1); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i, words]);

  return (
    <span className={className}>
      {text}
      <span className="inline-block w-[3px] h-[1em] bg-current align-middle ml-1 animate-pulse" />
    </span>
  );
};
