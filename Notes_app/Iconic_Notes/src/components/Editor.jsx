import React, { useEffect, useRef, useState } from "react";

export default function Editor({ title, setTitle, text, setText }) {
  const editorRef = useRef(null);
  const [hasFocus, setHasFocus] = useState(false);

  const format = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerText !== text) {
      editorRef.current.innerText = text;
    }
  }, [text]);

  return (
    <main className="relative min-h-screen flex-1 overflow-hidden border-r border-[#e1e4ed] bg-[#fafbff]">
      <div className="absolute left-1/2 top-7 z-10 flex h-[62px] min-w-[295px] -translate-x-1/2 items-center justify-center gap-2 rounded-[17px] bg-white px-3.5 shadow-[0_7px_22px_rgba(40,45,80,0.09)]">
        <button
          onClick={() => format("bold")}
          className="flex h-9 min-w-7 items-center justify-center rounded px-1.5 text-[21px] font-extrabold text-[#111725] hover:bg-gray-100"
        >
          B
        </button>
        <button
          onClick={() => format("italic")}
          className="flex h-9 min-w-7 items-center justify-center rounded px-1.5 text-[21px] font-semibold italic text-[#111725] hover:bg-gray-100"
        >
          I
        </button>
        <button
          onClick={() => format("underline")}
          className="flex h-9 min-w-7 items-center justify-center rounded px-1.5 text-[21px] text-[#111725] underline hover:bg-gray-100"
        >
          U
        </button>
        <span className="mx-1 h-[30px] w-px bg-[#d9dce5]" />
        <button
          onClick={() => format("insertUnorderedList")}
          className="flex h-9 min-w-7 items-center justify-center rounded text-[#111725] hover:bg-gray-100"
        >
          <span className="mr-1 text-xl">•</span>
          <span className="text-xs leading-3">
            <span className="block">━━</span>
            <span className="block">━━</span>
            <span className="block">━━</span>
          </span>
        </button>
        <button
          onClick={() => format("insertOrderedList")}
          className="flex h-9 min-w-7 items-center justify-center rounded text-[#111725] hover:bg-gray-100"
        >
          <span className="text-[9px] font-bold leading-[8px]">
            1<br />
            2<br />
            3
          </span>
          <span className="ml-1 text-xs leading-3">
            <span className="block">━━</span>
            <span className="block">━━</span>
            <span className="block">━━</span>
          </span>
        </button>
        <span className="mx-1 h-[30px] w-px bg-[#d9dce5]" />
        <button
          onClick={() => format("formatBlock", "blockquote")}
          className="flex h-9 min-w-7 items-center justify-center rounded text-[21px] font-extrabold tracking-[-4px] text-[#111725] hover:bg-gray-100"
        >
          99
        </button>
        <button
          onClick={() => format("formatBlock", "pre")}
          className="flex h-9 min-w-7 items-center justify-center rounded text-[22px] font-semibold text-[#111725] hover:bg-gray-100"
        >
          {"<>"}
        </button>
      </div>

      <div className="mx-auto w-full max-w-[850px] px-[30px] pb-20 pt-[132px]">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
          className="mb-[37px] w-full border-b border-[#cdd4e5] bg-transparent pb-3 text-[50px] font-extrabold leading-[1.13] tracking-[-1.7px] text-[#101a30] outline-none"
        />

        <div className="relative">
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={() => {
              if (editorRef.current) {
                setText(editorRef.current.innerText);
              }
            }}
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
            className="min-h-[300px] text-[20px] leading-[1.58] tracking-[0.02px] text-[#30334e] outline-none"
          />
          {!text && !hasFocus && (
            <div className="pointer-events-none absolute left-0 top-0 mt-1 text-[#9ca3af]">
              Start writing your note here...
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
