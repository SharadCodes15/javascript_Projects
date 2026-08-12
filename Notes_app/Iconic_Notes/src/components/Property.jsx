import React, { useRef, useState } from "react";

const colors = ["purple", "green", "blue", "red", "orange", "yellow"];

export default function PropertiesPanel({
  category,
  setCategory,
  tags,
  setTags,
  selectedColor,
  setSelectedColor,
  image,
  setImage,
  pinned,
  setPinned,
  saved,
  setSaved,
  onSave,
}) {
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef(null);

  const markChanged = () => setSaved(false);

  const addTag = (e) => {
    if (e.key !== "Enter") return;
    const value = tagInput.trim().replace(/^#/, "");
    if (!value) return;
    if (!tags.includes(value)) {
      setTags((prev) => [...prev, value]);
    }
    setTagInput("");
    markChanged();
  };

  const removeTag = (tag) => {
    setTags((prev) => prev.filter((item) => item !== tag));
    markChanged();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file.name);
    markChanged();
  };

  return (
    <aside className="flex min-h-screen w-[400px] flex-col bg-white">
      <div className="px-[30px] pb-10 pt-[30px]">
        <h2 className="mb-[18px] text-[16px] font-medium tracking-[1.1px] text-[#6b6e81]">PROPERTIES</h2>

        <div
          className={`mb-10 flex h-[53px] items-center gap-2 rounded-[9px] px-[15px] text-[15px] font-medium ${
            saved ? "bg-[#e4f1e9] text-[#1a4d30]" : "bg-[#fff2dc] text-[#7d4a00]"
          }`}
        >
          <span className="text-[20px]">☁</span>
          {saved ? "Saved just now" : "Unsaved changes"}
        </div>

        <div className="mb-10">
          <label className="mb-[10px] block text-[16px] font-medium text-[#171b2b]">Category</label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                markChanged();
              }}
              className="h-16 w-full appearance-none rounded-[9px] border border-[#cdd4e5] bg-[#f1f4ff] px-[18px] text-[16px] text-[#202538] outline-none"
            >
              <option>Work</option>
              <option>Personal</option>
              <option>Ideas</option>
              <option>Study</option>
            </select>
            <span className="pointer-events-none absolute right-[17px] top-[15px] text-[25px] leading-7 text-[#6b7184]">⌄</span>
          </div>
        </div>

        <div className="mb-[38px]">
          <label className="mb-[10px] block text-[16px] font-medium text-[#171b2b]">Tags</label>
          <div className="min-h-[113px] rounded-[9px] border border-[#cdd4e5] bg-[#f1f4ff] px-3 py-[10px]">
            <div className="flex flex-wrap gap-[9px]">
              {tags.map((tag) => (
                <span key={tag} className="flex items-center gap-2 rounded-[18px] bg-[#d9e7ff] px-[13px] py-[5px] text-[14px] text-[#303a55]">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="border-0 bg-transparent p-0 text-[19px] leading-[15px] text-[#34415c]">×</button>
                </span>
              ))}
            </div>
            <div className="mt-[13px] flex items-center">
              <span className="mr-[11px] text-[23px] font-medium text-[#7b7e89]">#</span>
              <input
                type="text"
                value={tagInput}
                placeholder="Add tag..."
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={addTag}
                className="w-full border-none bg-transparent text-[16px] text-[#222] outline-none placeholder:text-[#6c6f7b]"
              />
            </div>
          </div>
        </div>

        <div className="mb-[36px]">
          <label className="mb-[10px] block text-[16px] font-medium text-[#171b2b]">Color Marker</label>
          <div className="flex items-center gap-[14px]">
            {colors.map((color, index) => (
              <button
                key={color}
                onClick={() => {
                  setSelectedColor(index);
                  markChanged();
                }}
                className={`relative h-10 w-10 rounded-full border-0 ${selectedColor === index ? "ring-2 ring-[#3426db] ring-offset-2" : ""}`}
                style={{ backgroundColor: color }}
              />
            ))}
            <button
              onClick={() => {
                setSelectedColor(-1);
                markChanged();
              }}
              className={`relative flex h-10 w-10 items-center justify-center rounded-full border-0 bg-[#d9dbe6] text-[22px] text-[#5f6372] ${
                selectedColor === -1 ? "ring-2 ring-[#727687] ring-offset-2" : ""
              }`}
            >
              ∅
            </button>
          </div>
        </div>

        <div>
          <label className="mb-[10px] block text-[16px] font-medium text-[#171b2b]">Attachments</label>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex h-[94px] w-full items-center justify-center gap-[13px] rounded-[10px] border border-dashed border-[#c3c7d8] bg-white text-[16px] text-[#3c3e4f] transition hover:bg-[#f8f9ff]"
          >
            <span className="text-[25px] text-[#606476]">▧</span>
            <span>{image || "Attach Image or File"}</span>
          </button>
          <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
        </div>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-[15px] border-t border-[#e1e3eb] p-[30px]">
        <button onClick={() => window.location.reload()} className="h-[50px] rounded-[9px] border border-[#3327dc] bg-white text-[16px] font-medium text-[#231bc6] hover:bg-[#f8f7ff]">Cancel</button>
        <button onClick={onSave} className="h-[50px] rounded-[9px] border border-[#2415b8] bg-[#3928d2] text-[16px] font-medium text-white shadow-[0_5px_12px_rgba(52,40,210,0.17)] hover:bg-[#3022c2]">Done</button>
      </div>
    </aside>
  );
}
