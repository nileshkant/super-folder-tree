import React, { FC, useEffect, useRef } from "react";
import { SpanBox } from "../styles/box";
import SpanEditable from "../styles/editable";

const useDidMountEffect = (func: any, deps: any) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, [deps, func]);
};

export interface EditableProps {
  placeholder?: string;
  content?: string;
  onChange: (content: string) => void;
  focus?: boolean;
  isEdit: boolean;
  isEditable: () => void;
}
const pasteListener = (evt: ClipboardEvent) => {
  evt.preventDefault();
  const text = evt.clipboardData?.getData("text/plain");
  const selectedRange = window.getSelection()?.getRangeAt(0);
  if (!selectedRange || !text) return;

  // document.execCommand('insertHTML', false, text);
  selectedRange.deleteContents();
  selectedRange.insertNode(document.createTextNode(text));
  selectedRange.setStart(selectedRange.endContainer, selectedRange.endOffset);
};

export const Editable: FC<EditableProps> = ({
  placeholder,
  content = "",
  onChange,
  focus = false,
  isEdit = false,
  isEditable,
}) => {
  const htmlData = document.createElement("span");
  htmlData.innerHTML = content || "";
  const contentRef = useRef<HTMLSpanElement>(htmlData);

  useEffect(() => {
    const contentNode = contentRef.current!;
    contentNode.addEventListener("paste", pasteListener);
    return () => contentNode.removeEventListener("paste", pasteListener);
  }, []);

  useDidMountEffect(() => {
    if (focus || isEdit) {
      contentRef.current.focus();
    }
  }, [content, focus]);

  return (
    <SpanBox padding={10}>
      <SpanEditable
        onInput={() => {
          onChange(contentRef.current.innerHTML);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            contentRef.current.blur();
            isEditable();
          }
        }}
        ref={contentRef}
        contentEditable={isEdit}
        dangerouslySetInnerHTML={{ __html: content }}
        placeholder={placeholder}
      />
    </SpanBox>
  );
};
