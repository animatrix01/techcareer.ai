"use client";

import { useEffect } from "react";

import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import { BoldIcon, ItalicIcon, ListIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TipTapEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
};

export function TipTapEditor({
  value,
  onChange,
  placeholder,
  className,
}: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "<p></p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-36 w-full rounded-b-md border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none prose prose-slate prose-base max-w-none shadow-sm",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || "<p></p>", { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) return null;

  return (
    <div className={cn("space-y-0", className)}>
      <div className="flex items-center gap-1 rounded-t-md border border-b-0 border-slate-300 bg-slate-100 p-1.5">
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          className={cn(
            "text-slate-600 hover:bg-slate-200 hover:text-slate-900",
            editor.isActive("bold") && "bg-white text-slate-900 shadow-sm",
          )}
          onClick={() => editor.chain().focus().toggleBold().run()}
          aria-label="Bold"
        >
          <BoldIcon className="size-4" />
        </Button>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          className={cn(
            "text-slate-600 hover:bg-slate-200 hover:text-slate-900",
            editor.isActive("italic") && "bg-white text-slate-900 shadow-sm",
          )}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
        >
          <ItalicIcon className="size-4" />
        </Button>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          className={cn(
            "text-slate-600 hover:bg-slate-200 hover:text-slate-900",
            editor.isActive("bulletList") && "bg-white text-slate-900 shadow-sm",
          )}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Bullet list"
        >
          <ListIcon className="size-4" />
        </Button>
      </div>
      <EditorContent editor={editor} />
      {placeholder ? (
        <p className="mt-1 text-xs text-slate-500">{placeholder}</p>
      ) : null}
    </div>
  );
}
