import { bgPrimaryColor } from "@/utils/colors";
import EditorPanel from "./_components/EditorPanel";
import OutputPanel from "./_components/OutputPanel";
import Header from "./_components/Header";

export default function MonacoEditor() {
  return (
    <div className={`min-h-screen ${bgPrimaryColor}`}>
      <div className="mx-auto p-1">
        <Header />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <EditorPanel />
          <OutputPanel />
        </div>
      </div>
    </div>
  );
}
