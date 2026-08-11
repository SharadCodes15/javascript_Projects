import React from "react";

export default function Editor() {
  const format = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  return (
    <main className="relative min-h-screen flex-1 overflow-hidden border-r border-[#e1e4ed] bg-[#fafbff]">

      {/* Floating toolbar */}
      <div
        className="
          absolute left-1/2 top-7 z-10
          flex h-[62px] min-w-[295px] -translate-x-1/2
          items-center justify-center gap-2
          rounded-[17px] bg-white px-3.5
          shadow-[0_7px_22px_rgba(40,45,80,0.09)]
        "
      >
        <button
          onClick={() => format("bold")}
          className="flex h-9 min-w-7 items-center justify-center rounded px-1.5
                     text-[21px] font-extrabold text-[#111725] hover:bg-gray-100"
        >
          B
        </button>

        <button
          onClick={() => format("italic")}
          className="flex h-9 min-w-7 items-center justify-center rounded px-1.5
                     text-[21px] font-semibold italic text-[#111725] hover:bg-gray-100"
        >
          I
        </button>

        <button
          onClick={() => format("underline")}
          className="flex h-9 min-w-7 items-center justify-center rounded px-1.5
                     text-[21px] text-[#111725] underline hover:bg-gray-100"
        >
          U
        </button>

        <span className="mx-1 h-[30px] w-px bg-[#d9dce5]" />

        {/* Bullet list */}
        <button
          onClick={() => format("insertUnorderedList")}
          className="flex h-9 min-w-7 items-center justify-center rounded
                     text-[#111725] hover:bg-gray-100"
        >
          <span className="mr-1 text-xl">•</span>
          <span className="text-xs leading-3">
            <span className="block">━━</span>
            <span className="block">━━</span>
            <span className="block">━━</span>
          </span>
        </button>

        {/* Numbered list */}
        <button
          onClick={() => format("insertOrderedList")}
          className="flex h-9 min-w-7 items-center justify-center rounded
                     text-[#111725] hover:bg-gray-100"
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

        {/* Quote */}
        <button
          onClick={() => format("formatBlock", "blockquote")}
          className="flex h-9 min-w-7 items-center justify-center rounded
                     text-[21px] font-extrabold tracking-[-4px]
                     text-[#111725] hover:bg-gray-100"
        >
          99
        </button>

        {/* Code */}
        <button
          onClick={() => format("formatBlock", "pre")}
          className="flex h-9 min-w-7 items-center justify-center rounded
                     text-[22px] font-semibold text-[#111725]
                     hover:bg-gray-100"
        >
          {"<>"}
        </button>
      </div>

      {/* Editor document */}
      <div className="mx-auto w-full max-w-[850px] px-[30px] pb-20 pt-[132px]">

        <h1
          className="
            mb-[37px]
            text-[50px]
            font-extrabold
            leading-[1.13]
            tracking-[-1.7px]
            text-[#101a30]
          "
        >
          Meeting Notes: Q3 Strategy
        </h1>

        <div
          contentEditable
          suppressContentEditableWarning
          className="
            text-[20px]
            leading-[1.58]
            tracking-[0.02px]
            text-[#30334e]
            outline-none
          "
        >
          <p className="mb-[33px]">
            Discussed the primary objectives for the upcoming quarter. Main
            focus
            <br />
            will be on user retention and improving the onboarding experience
            for
            <br />
            the enterprise tier.
          </p>

          <ul className="mb-[52px] list-disc pl-7">
            <li>Revamp welcome email sequence.</li>

            <li>Implement contextual tooltips in the dashboard.</li>

            <li>
              Schedule follow-up calls with key accounts 14 days post-signup.
            </li>
          </ul>

          <p className="mb-[33px]">
            Need to allocate additional resources to the frontend team to
            handle the
            <br />
            UI overhaul by November.
          </p>
        </div>
      </div>
    </main>
  );
}