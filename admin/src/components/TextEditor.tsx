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
import { uploadImage } from "@/util/ImageUploader/page";

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
    const [showButtonModal, setShowButtonModal] = useState(false);
    const [buttonName, setButtonName] = useState("");
    const [buttonUrl, setButtonUrl] = useState("");

   
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
              ['link', 'image'],
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

        // Add custom image handler: open file picker, upload to Cloudinary, insert URL
        const toolbar = quill.getModule('toolbar');
        if (toolbar && toolbar.addHandler) {
          toolbar.addHandler('image', async () => {
            try {
              const input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');
              input.onchange = async () => {
                const file = (input.files && input.files[0]) || null;
                if (!file) return;

                // Upload via existing utility
                const url = await uploadImage(file);
                if (!url) return;

                const range = quill.getSelection(true);
                const index = range ? range.index : quill.getLength();
                quill.insertEmbed(index, 'image', url, 'user');
                quill.setSelection(index + 1, 0, 'silent');
              };
              input.click();
            } catch (_) {
              // Swallow errors to avoid breaking editor UX
            }
          });
        }
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
      <div className="quill-editor" style={{ position: 'relative', overflow: 'visible' }}>
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
          /* Preserve button styling in editor */
          .quill-editor .ql-editor a[style*="background-color"],
          .quill-editor .ql-editor a[href]:has-text[style*="display: inline-block"] {
            background-color: #3b82f6 !important;
            color: white !important;
            display: inline-block !important;
            padding: 8px 16px !important;
            border-radius: 4px !important;
            text-decoration: none !important;
            font-weight: 500 !important;
            margin: 8px 0 !important;
            border: none !important;
          }
          /* Alternative selector for buttons */
          .quill-editor .ql-editor a[style*="inline-block"] {
            background-color: #3b82f6 !important;
            color: white !important;
          }
          /* Limit image size in editor */
          .quill-editor .ql-editor img {
            max-width: 200px !important;
            max-height: 150px !important;
            width: auto !important;
            height: auto !important;
            object-fit: contain !important;
            display: inline-block !important;
            margin: 4px 0 !important;
          }
          .quill-editor .ql-toolbar {
            border-bottom: 1px solid #ccc;
          }
          .quill-editor .ql-container.ql-snow {
            border-top: none;
            overflow: visible !important;
          }
          /* Ensure button is visible above editor */
          .quill-editor .ql-editor {
            overflow: visible !important;
          }
          /* Ensure quill-wrapper doesn't hide button */
          .quill-wrapper {
            position: relative !important;
            overflow: visible !important;
          }
          .quill-wrapper .quill-editor {
            overflow: visible !important;
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
        <div className="relative" style={{ overflow: 'visible' }}>
          <div ref={containerRef} />
          {/* Custom Button Helper - positioned at bottom right of editor */}
          {!readOnly && !showButtonModal && (
            <button
              type="button"
              onClick={() => setShowButtonModal(true)}
              className="absolute bottom-2 right-2 px-3 py-1.5 text-xs font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors z-[100] shadow-md pointer-events-auto"
              title="Insert Button"
              style={{ 
                marginBottom: '4px',
                position: 'absolute',
                zIndex: 100
              }}
            >
              + Button
            </button>
          )}
        </div>
        
        {/* Button Insert Modal */}
        {showButtonModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Insert Button</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Button Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={buttonName}
                    onChange={(e) => setButtonName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Learn More"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Button URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={buttonUrl}
                    onChange={(e) => setButtonUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., /blog/some-post or https://example.com"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => {
                    setShowButtonModal(false);
                    setButtonName("");
                    setButtonUrl("");
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Validate inputs
                    if (!buttonName.trim() || !buttonUrl.trim()) {
                      return; // Don't close modal if fields are empty
                    }

                    // Get Quill instance
                    const quill = quillInstanceRef.current;
                    if (quill) {
                      // Get current cursor position or end of content
                      const range = quill.getSelection(true);
                      const index = range ? range.index : quill.getLength();

                      // Generate button HTML with inline styles for better compatibility
                      const buttonHTML = `<a href="${buttonUrl.trim()}" style="display: inline-block; padding: 8px 16px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 4px; font-weight: 500; margin: 8px 0;">${buttonName.trim()}</a>`;

                      // Method 1: Try directly inserting HTML using clipboard's dangerouslyPasteHTML
                      try {
                        // Get current selection
                        const length = quill.getLength();
                        const cursorPos = range ? range.index : length;
                        
                        // Insert button HTML directly at cursor position
                        quill.clipboard.dangerouslyPasteHTML(cursorPos, buttonHTML, 'user');
                        
                        // Move cursor after button
                        const newPos = cursorPos + buttonName.trim().length + 10;
                        quill.setSelection(newPos, 0, 'api');
                      } catch (e) {
                        // Fallback: Use Delta method
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = buttonHTML;
                        
                        // Convert HTML to Quill Delta
                        const delta = quill.clipboard.convert(tempDiv);
                        
                        // Get the Delta class from Quill constructor
                        const QuillClass = quill.constructor as any;
                        const QuillDelta = QuillClass.import('delta');
                        
                        // Create a Delta that retains up to cursor position, then inserts the button
                        const insertDelta = new QuillDelta().retain(index).concat(delta);
                        
                        // Insert the Delta
                        quill.updateContents(insertDelta, 'user');
                        
                        // Move cursor after inserted button
                        const buttonTextLength = buttonName.trim().length;
                        quill.setSelection(index + buttonTextLength + 1, 0, 'api');
                        
                        // Clean up
                        tempDiv.remove();
                      }
                    }

                    // Close modal and reset form
                    setShowButtonModal(false);
                    setButtonName("");
                    setButtonUrl("");
                  }}
                  disabled={!buttonName.trim() || !buttonUrl.trim()}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Insert
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

Editor.displayName = 'Editor';

// Memoize the component to prevent unnecessary re-renders
const MemoizedEditor = memo(Editor);

export default MemoizedEditor;
