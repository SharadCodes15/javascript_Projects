
import Editor from "../components/Editor";
import PropertiesPanel from "../components/Property";
import Sidebar from "../components/Sidebar";

export default function CreateNotes() {
  return (
   <div className="flex min-h-screen">
    <Sidebar />

    <div className="flex min-w-0 flex-1">
      <Editor />
      <PropertiesPanel />
    </div>
  </div>
  );
}