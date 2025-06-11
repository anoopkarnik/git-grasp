import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@repo/ui/atoms/shadcn/button"; // Or just use a native <button>

const MarkdownPreview = ({ content }:{content:string}) => {

  const handleCopy = async () => {
    if (content) {
      await navigator.clipboard.writeText(content);
      // Optional: toast or feedback
    }
  };

  return (
    <div
      className="
        bg-neutral-50
        dark:bg-neutral-900
        rounded-2xl
        shadow-md
        p-6
        mt-6
        relative
        border
        border-neutral-200
        dark:border-neutral-700
        overflow-x-auto
      "
      style={{
        fontFamily: "Inter, ui-sans-serif, system-ui",
        minHeight: 180,
      }}
    >
      <div className="absolute top-4 right-4">
        <Button onClick={handleCopy} size="sm" variant="outline">
          Copy Markdown
        </Button>
      </div>
      <MDEditor.Markdown
        source={content}
        style={{
          background: "transparent",
          fontSize: 16,
          fontFamily: "inherit",
        }}
        components={{
          code({ className, children, ...props }) {
            return (
              <code
                className={`rounded bg-neutral-200 dark:bg-neutral-800 px-2 py-1 font-mono ${className || ""}`}
                {...props}
              >
                {children}
              </code>
            );
          }
        }}
      />
    </div>
  );
};

export default MarkdownPreview;
