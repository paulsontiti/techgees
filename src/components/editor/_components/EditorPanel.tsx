"use client";

import { useEffect, useRef } from "react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "@/constants";
import { Editor } from "@monaco-editor/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { RotateCcwIcon, TypeIcon } from "lucide-react";
import { useCodeEditorStore } from "../../../../store/useCodeEditorStore";
import useMounted from "../../../../hooks/useMounted";
import RunButton from "./RunButton";
import { useRouter } from "next/navigation";


function EditorPanel() {
  const { language, theme, fontSize, editor, setFontSize, setEditor } = useCodeEditorStore();
const router = useRouter();

  const mounted = useMounted();

  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(newCode);
  }, [language, editor]);

  useEffect(() => {
    const savedFontSize = localStorage.getItem("editor-font-size");
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
  }, [setFontSize]);


  const handleRefresh = () => {
    const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
if(language === "html_css"){
  //editor is null when language is html_css
  //Refresh to get the editor
  router.refresh();
}
    if (editor) editor.setValue(defaultCode);
    localStorage.removeItem(`editor-code-${language}`);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value) localStorage.setItem(`editor-code-${language}`, value);
  };

  const handleFontSizeChange = (newSize: number) => {
    const size = Math.min(Math.max(newSize, 12), 24);
    setFontSize(size);
    localStorage.setItem("editor-font-size", size.toString());
  };

  if (!mounted) return null;

  return (
    <div className="relative p-2">
      <div className="relative bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/[0.05] p-1">

        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1e1e2e] ring-1 ring-white/5">
              <Image src={"/" + language + ".png"} alt="Logo" width={24} height={24} />
            </div>
            <div>
              <h2 className="text-sm font-medium text-white">Code Editor</h2>
              <p className="text-xs text-gray-500">Write and execute your code</p>
            </div>

          </div>
          <div className="flex items-center justify-between gap-3">
            {/* Font Size Slider */}
            <div className="flex items-center gap-3 px-3 py-2 bg-[#1e1e2e] rounded-lg ring-1 ring-white/5">
              <TypeIcon className="size-4 text-gray-400" />
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
                  className="w-20 h-1 bg-gray-600 rounded-lg cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-400 min-w-[2rem] text-center">
                  {fontSize}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                className="p-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-lg ring-1 ring-white/5 transition-colors"
                aria-label="Reset to default code"
              >
                <RotateCcwIcon className="size-4 text-gray-400" />
              </motion.button>
              <RunButton />
            </div>
          </div>
        </div>

        {/* Editor  */}
        <div className="relative group rounded-xl overflow-hidden ring-1 ring-white/[0.05]">
        
            <Editor
              height="600px"
              language={LANGUAGE_CONFIG[language].monacoLanguage}
              onChange={handleEditorChange}
              theme={theme}
              beforeMount={defineMonacoThemes}
              onMount={(editor: any) => setEditor(editor)}
              options={{
                minimap: { enabled: false },
                fontSize,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                renderWhitespace: "selection",
                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                fontLigatures: true,
                cursorBlinking: "smooth",
                smoothScrolling: true,
                contextmenu: true,
                renderLineHighlight: "all",
                lineHeight: 1.6,
                letterSpacing: 0.5,
                roundedSelection: true,
                scrollbar: {
                  verticalScrollbarSize: 8,
                  horizontalScrollbarSize: 8,
                },
              }}
            />
        </div>
      </div>

    </div>
  );
}
export default EditorPanel;
