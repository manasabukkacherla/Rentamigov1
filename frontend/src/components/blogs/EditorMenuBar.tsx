"use client"

import type React from "react"

import type { Editor } from "@tiptap/react"
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  LinkIcon,
  Unlink,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Undo,
  Redo,
  Code,
  Maximize2,
  Minimize2,
  HelpCircle,
  Image,
} from "lucide-react"
import { useState } from "react"

interface EditorMenuBarProps {
  editor: Editor | null
}

const EditorMenuBar = ({ editor }: EditorMenuBarProps) => {
  const [linkUrl, setLinkUrl] = useState("")
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  if (!editor) {
    return null
  }

  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run()
      setLinkUrl("")
      setShowLinkInput(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addLink()
    }
  }

  const toggleFullscreen = () => {
    const editorElement = document.querySelector(".ProseMirror")?.parentElement
    if (editorElement) {
      if (!isFullscreen) {
        if (editorElement.requestFullscreen) {
          editorElement.requestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
      }
      setIsFullscreen(!isFullscreen)
    }
  }

  const buttonClasses = "p-2 rounded transition-colors duration-200 flex items-center justify-center"
  const activeButtonClasses = "bg-black text-white"
  const inactiveButtonClasses = "hover:bg-gray-100 text-gray-700"

  return (
    <div className="border-b border-gray-200 bg-gray-50 p-1 flex flex-wrap gap-1 sticky top-0 z-10">
      <div className="flex items-center space-x-1 mr-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`${buttonClasses} ${editor.isActive("heading", { level: 1 }) ? activeButtonClasses : inactiveButtonClasses}`}
          title="Heading 1"
          onMouseEnter={() => setShowTooltip("Heading 1")}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <Heading1 size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${buttonClasses} ${editor.isActive("heading", { level: 2 }) ? activeButtonClasses : inactiveButtonClasses}`}
          title="Heading 2"
          onMouseEnter={() => setShowTooltip("Heading 2")}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <Heading2 size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`${buttonClasses} ${editor.isActive("heading", { level: 3 }) ? activeButtonClasses : inactiveButtonClasses}`}
          title="Heading 3"
          onMouseEnter={() => setShowTooltip("Heading 3")}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <Heading3 size={18} />
        </button>
      </div>

      <div className="w-px h-8 bg-gray-300 mx-1"></div>

      <div className="flex items-center space-x-1 mr-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${buttonClasses} ${editor.isActive("bold") ? activeButtonClasses : inactiveButtonClasses}`}
          title="Bold"
          onMouseEnter={() => setShowTooltip("Bold")}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${buttonClasses} ${editor.isActive("italic") ? activeButtonClasses : inactiveButtonClasses}`}
          title="Italic"
          onMouseEnter={() => setShowTooltip("Italic")}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <Italic size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${buttonClasses} ${editor.isActive("underline") ? activeButtonClasses : inactiveButtonClasses}`}
          title="Underline"
          onMouseEnter={() => setShowTooltip("Underline")}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <Underline size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${buttonClasses} ${editor.isActive("strike") ? activeButtonClasses : inactiveButtonClasses}`}
          title="Strikethrough"
          onMouseEnter={() => setShowTooltip("Strikethrough")}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <Strikethrough size={18} />
        </button>
      </div>

      <div className="w-px h-8 bg-gray-300 mx-1"></div>

      <div className="flex items-center space-x-1 mr-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${buttonClasses} ${editor.isActive("bulletList") ? activeButtonClasses : inactiveButtonClasses}`}
          title="Bullet List"
          onMouseEnter={() => setShowTooltip("Bullet List")}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <List size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${buttonClasses} ${editor.isActive("orderedList") ? activeButtonClasses : inactiveButtonClasses}`}
          title="Ordered List"
          onMouseEnter={() => setShowTooltip("Ordered List")}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <ListOrdered size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${buttonClasses} ${editor.isActive("blockquote") ? activeButtonClasses : inactiveButtonClasses}`}
          title="Quote"
          onMouseEnter={() => setShowTooltip("Quote")}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <Quote size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`${buttonClasses} ${editor.isActive("codeBlock") ? activeButtonClasses : inactiveButtonClasses}`}
          title="Code Block"
          onMouseEnter={() => setShowTooltip("Code Block")}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <Code size={18} />
        </button>
      </div>

      <div className="w-px h-8 bg-gray-300 mx-1"></div>

      <div className="flex items-center space-x-1 mr-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`${buttonClasses} ${editor.isActive({ textAlign: "left" }) ? activeButtonClasses : inactiveButtonClasses}`}
          title="Align Left"
          onMouseEnter={() => setShowTooltip("Align Left")}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <AlignLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`${buttonClasses} ${editor.isActive({ textAlign: "center" }) ? activeButtonClasses : inactiveButtonClasses}`}
          title="Align Center"
          onMouseEnter={() => setShowTooltip("Align Center")}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <AlignCenter size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`${buttonClasses} ${editor.isActive({ textAlign: "right" }) ? activeButtonClasses : inactiveButtonClasses}`}
          title="Align Right"
          onMouseEnter={() => setShowTooltip("Align Right")}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <AlignRight size={18} />
        </button>
      </div>

      <div className="w-px h-8 bg-gray-300 mx-1"></div>

      <div className="flex items-center space-x-1">
        {showLinkInput ? (
          <div className="flex items-center bg-white rounded border border-gray-300 overflow-hidden">
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="https://example.com"
              className="px-2 py-1 text-sm focus:outline-none w-40"
              autoFocus
            />
            <button type="button" onClick={addLink} className="bg-black text-white px-2 py-1 text-sm hover:bg-gray-800">
              Add
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              if (editor.isActive("link")) {
                editor.chain().focus().unsetLink().run()
              } else {
                setShowLinkInput(true)
              }
            }}
            className={`${buttonClasses} ${editor.isActive("link") ? activeButtonClasses : inactiveButtonClasses}`}
            title={editor.isActive("link") ? "Remove Link" : "Add Link"}
            onMouseEnter={() => setShowTooltip(editor.isActive("link") ? "Remove Link" : "Add Link")}
            onMouseLeave={() => setShowTooltip(null)}
          >
            {editor.isActive("link") ? <Unlink size={18} /> : <LinkIcon size={18} />}
          </button>
        )}

        <button
          type="button"
          onClick={() => document.getElementById("editor-image-upload")?.click()}
          className={`${buttonClasses} ${inactiveButtonClasses}`}
          title="Insert Image"
          onMouseEnter={() => setShowTooltip("Insert Image")}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <Image size={18} />
        </button>
      </div>

      <div className="ml-auto flex items-center space-x-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className={`${buttonClasses} ${inactiveButtonClasses}`}
          title="Undo"
          disabled={!editor.can().undo()}
          onMouseEnter={() => setShowTooltip("Undo")}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <Undo size={18} className={!editor.can().undo() ? "opacity-50" : ""} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className={`${buttonClasses} ${inactiveButtonClasses}`}
          title="Redo"
          disabled={!editor.can().redo()}
          onMouseEnter={() => setShowTooltip("Redo")}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <Redo size={18} className={!editor.can().redo() ? "opacity-50" : ""} />
        </button>

        <button
          type="button"
          onClick={toggleFullscreen}
          className={`${buttonClasses} ${inactiveButtonClasses}`}
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          onMouseEnter={() => setShowTooltip(isFullscreen ? "Exit Fullscreen" : "Fullscreen")}
          onMouseLeave={() => setShowTooltip(null)}
        >
          {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>

        <button
          type="button"
          className={`${buttonClasses} ${inactiveButtonClasses}`}
          title="Editor Help"
          onMouseEnter={() => setShowTooltip("Editor Help")}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <HelpCircle size={18} />
        </button>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded pointer-events-none">
          {showTooltip}
        </div>
      )}
    </div>
  )
}

export default EditorMenuBar

