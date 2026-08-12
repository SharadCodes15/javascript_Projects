import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Editor from "../components/Editor";
import PropertiesPanel from "../components/Property";
import Sidebar from "../components/Sidebar";

const NOTE_COLORS = [
  "purple",
  "green",
  "blue",
  "red",
  "orange",
  "yellow",
  "teal",
  "pink",
  "gray",
  "indigo",
];

export default function CreateNotes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Work");
  const [tags, setTags] = useState(["strategy", "q3"]);
  const [selectedColor, setSelectedColor] = useState(0);
  const [image, setImage] = useState("");
  const [pinned, setPinned] = useState(false);
  const [date, setDate] = useState("Today");
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:3000/api/notes/${id}`)
      .then((res) => {
        const note = res.data.note;
        setTitle(note.title || "");
        setText(note.text || "");
        setCategory(note.category || "Work");
        setTags(note.tag ? note.tag.split(",").map((value) => value.trim()) : []);
        setImage(note.image || "");
        setPinned(Boolean(note.pinned));
        setDate(note.date || "Today");
        setSelectedColor(NOTE_COLORS.indexOf(note.color) >= 0 ? NOTE_COLORS.indexOf(note.color) : 0);
        setSaved(true);
      })
      .catch((err) => {
        console.error("Error loading note", err);
        alert("Could not load note for editing.");
      });
  }, [id]);

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
        color: NOTE_COLORS[selectedColor] || "purple",
      };

      const response = id
        ? await axios.put(`http://localhost:3000/api/notes/${id}`, payload)
        : await axios.post("http://localhost:3000/api/notes/Create-Note", payload);

      console.log("Note saved", response.data);
      setSaved(true);
      alert(`Note ${id ? "updated" : "created"} successfully`);
      if (!id) {
        navigate("/");
      }
    } catch (error) {
      console.error("Save note failed", error);
      alert("Failed to save note. Check the console.");
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