import { useState } from "react";
import axios from "axios";
import Editor from "../components/Editor";
import PropertiesPanel from "../components/Property";
import Sidebar from "../components/Sidebar";

export default function CreateNotes() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Work");
  const [tags, setTags] = useState(["strategy", "q3"]);
  const [selectedColor, setSelectedColor] = useState(0);
  const [image, setImage] = useState("");
  const [pinned, setPinned] = useState(false);
  const [date, setDate] = useState("Today");
  const [saved, setSaved] = useState(true);

  const handleSave = async () => {
    try {
      const payload = {
        category,
        date,
        title: title || "No Title",
        text,
        tag: tags.join(", "),
        image,
        pinned,
        color: selectedColor >= 0 ? ["purple", "green", "blue", "red", "orange", "yellow", "teal", "pink", "gray", "indigo"][selectedColor] : "purple",
      };

      const response = await axios.post(
        "http://localhost:3000/api/notes/Create-Note",
        payload
      );

      console.log("Note created", response.data);
      setSaved(true);
      alert("Note created successfully");
    } catch (error) {
      console.error("Create note failed", error);
      alert("Failed to create note. Check the console.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1">
        <Editor
          title={title}
          setTitle={setTitle}
          text={text}
          setText={setText}
        />
        <PropertiesPanel
          category={category}
          setCategory={setCategory}
          tags={tags}
          setTags={setTags}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          image={image}
          setImage={setImage}
          pinned={pinned}
          setPinned={setPinned}
          saved={saved}
          setSaved={setSaved}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}