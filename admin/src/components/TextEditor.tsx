'use client';

import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  MutableRefObject,
  useState,
  memo,
} from 'react';

// Global instance counter to prevent conflicts
let editorInstanceCounter = 0;


type DeltaStatic = any; 
type Sources = 'api' | 'user' | 'silent';
type RangeStatic = { index: number; length: number };

type EditorProps = {
  readOnly?: boolean;
  defaultValue?: DeltaStatic;
  state?: string; 
  setState?: (html: string) => void; 
  onTextChange?: (
    delta: any,
    oldDelta: any,
    source: any
  ) => void;
  onSelectionChange?: (
    range: any,
    oldRange: any,
    source: any
  ) => void;
};

const Editor = forwardRef<any, EditorProps>(
  (
    {
      readOnly = false,
      defaultValue,
      state,
      setState,
      onTextChange,
      onSelectionChange,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);
    const [isClient, setIsClient] = useState(false);
    const [Quill, setQuill] = useState<any>(null);
    const [instanceId] = useState(() => ++editorInstanceCounter);
    const quillInstanceRef = useRef<any>(null);

   
    useEffect(() => {
      setIsClient(true);
    }, []);

    
    useEffect(() => {
      if (isClient) {
        const loadQuill = async () => {
          const QuillModule = await import('quill');
         
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
          document.head.appendChild(link);
          setQuill(() => QuillModule.default);
        };
        loadQuill();
      }
    }, [isClient]);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    }, [onTextChange, onSelectionChange]);

    
    useEffect(() => {
      if (ref && typeof ref !== 'function' && Quill) {
        (ref.current as any)?.enable?.(!readOnly);
      }
    }, [readOnly, ref, Quill]);

    useEffect(() => {
      if (!isClient || !Quill) return;
      
      const container = containerRef.current;
      if (!container) return;

      // Only create if no instance exists
      if (!quillInstanceRef.current) {
        // Clear container completely
        container.innerHTML = '';

        // Create unique container ID
        const containerId = `quill-container-${instanceId}`;
        container.id = containerId;

        const quill = new Quill(container, {
          theme: 'snow',
          readOnly,
          modules: {
            toolbar: [
              [{ 'header': [1, 2, 3, false] }],
              ['bold', 'italic', 'underline'],
              ['link'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['clean']
            ]
          }
        });

        quillInstanceRef.current = quill;
        
        if (ref && typeof ref !== 'function') {
          (ref as MutableRefObject<any>).current = quill;
        }

        quill.on('text-change', (delta: any, oldDelta: any, source: any) => {
          onTextChangeRef.current?.(delta, oldDelta, source);
          if (setState) {
            setState(quill.root.innerHTML);
          }
        });

        quill.on('selection-change', (range: any, oldRange: any, source: any) => {
          onSelectionChangeRef.current?.(range, oldRange, source);
        });
      }

      // Update content only if it has changed
      const quill = quillInstanceRef.current;
      if (quill) {
        if (defaultValue) {
          quill.setContents(defaultValue);
        } else if (state && quill.root.innerHTML !== state) {
          quill.root.innerHTML = state;
        }
      }

      return () => {
        // Only cleanup on unmount, not on every render
        if (quillInstanceRef.current) {
          quillInstanceRef.current = null;
        }
        if (ref && typeof ref !== 'function') {
          (ref as MutableRefObject<any>).current = null;
        }
        if (container) {
          container.innerHTML = '';
        }
      };
    }, [isClient, Quill, instanceId]); // Removed state and other dependencies

    // External value changes sync
    useEffect(() => {
      if (ref && typeof ref !== 'function' && state && Quill) {
        const quill = ref.current;
        if (quill && quill.root.innerHTML !== state) {
          const selection = quill.getSelection();
          quill.root.innerHTML = state;
          if (selection) quill.setSelection(selection);
        }
      }
    }, [state, ref, Quill]);

    // Show loading state while Quill loads
    if (!isClient || !Quill) {
      return (
        <div className="quill-editor">
          <div className="h-[130px] border border-gray-300 rounded-md flex items-center justify-center bg-white">
            <span className="text-gray-600">Loading editor...</span>
          </div>
        </div>
      );
    }

    return (
      <div className="quill-editor">
        <style jsx global>{`
          .quill-editor .ql-container {
            height: 130px;
            background: #fff;
            border-radius: 0 0 5px 5px;
          }
          .quill-editor .ql-toolbar.ql-snow {
            border-radius: 5px 5px 0 0;
          }
          .quill-editor .ql-editor {
            font-size: 14px;
            line-height: 1.5;
            color: #000 !important;
            background: #fff !important;
          }
          .quill-editor .ql-editor p {
            color: #000 !important;
            margin: 0 0 8px 0;
          }
          .quill-editor .ql-editor h1,
          .quill-editor .ql-editor h2,
          .quill-editor .ql-editor h3 {
            color: #000 !important;
          }
          .quill-editor .ql-editor ul,
          .quill-editor .ql-editor ol {
            color: #000 !important;
          }
          .quill-editor .ql-editor li {
            color: #000 !important;
          }
          .quill-editor .ql-editor a {
            color: #000 !important;
          }
          .quill-editor .ql-toolbar {
            border-bottom: 1px solid #ccc;
          }
          .quill-editor .ql-container.ql-snow {
            border-top: none;
          }
          /* Ensure only one toolbar per editor */
          .quill-editor .ql-toolbar:not(:first-child) {
            display: none !important;
          }
          /* Hide duplicate toolbars */
          .ql-toolbar.ql-snow + .ql-toolbar.ql-snow {
            display: none !important;
          }
          @media (max-width: 640px) {
            .quill-editor .ql-toolbar {
              padding: 8px;
            }
            .quill-editor .ql-toolbar .ql-formats {
              margin-right: 8px;
            }
            .quill-editor .ql-container {
              height: 100px;
            }
          }
        `}</style>
        <div ref={containerRef} />
      </div>
    );
  }
);

Editor.displayName = 'Editor';

// Memoize the component to prevent unnecessary re-renders
const MemoizedEditor = memo(Editor);

export default MemoizedEditor;
