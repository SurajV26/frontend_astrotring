import React, { createContext, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Sparkles } from 'lucide-react';

const ListContext = createContext('unordered');

const CodeBlock = ({ inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');

  if (!inline && match) {
    return (
      <div className="relative my-4 rounded-xl overflow-hidden bg-[#1E1E1E] shadow-lg border border-gray-700/50">
        <div className="px-4 py-2 bg-[#2D2D2D] text-amber-400 text-xs font-mono border-b border-gray-700/50">
          <span className="lowercase">{match[1]}</span>
        </div>
        <div className="text-sm">
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
            customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }}
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  }

  return (
    <code className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-md text-sm font-mono break-words" {...props}>
      {children}
    </code>
  );
};

const MarkdownRenderer = ({ content }) => {
  return (
    <div className="prose prose-sm sm:prose-base max-w-none text-gray-800 break-words
                 prose-p:leading-relaxed prose-p:mb-3 last:prose-p:mb-0
                 prose-pre:p-0 prose-pre:bg-transparent prose-pre:m-0
                 prose-headings:font-semibold prose-headings:text-gray-900 prose-headings:mt-6 prose-headings:mb-3
                 prose-h1:text-2xl prose-h1:border-b prose-h1:border-amber-200 prose-h1:pb-2
                 prose-h2:text-xl prose-h2:border-b prose-h2:border-amber-100 prose-h2:pb-1
                 prose-h3:text-lg prose-h3:text-amber-700
                 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-a:underline prose-a:underline-offset-2
                 prose-blockquote:border-l-4 prose-blockquote:border-amber-400 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:my-4
                 prose-hr:my-6 prose-hr:border-gray-200
                 prose-strong:font-bold prose-strong:text-amber-700">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
      components={{
        code: CodeBlock,
        ul: ({node, ...props}) => (
          <ListContext.Provider value="unordered">
            <ul className="!list-none !pl-0 space-y-3 my-4" {...props} />
          </ListContext.Provider>
        ),
        ol: ({node, ...props}) => (
          <ListContext.Provider value="ordered">
            <ol className="!list-decimal !pl-5 space-y-3 my-4 marker:text-amber-600 marker:font-semibold" {...props} />
          </ListContext.Provider>
        ),
        li: ({node, children, ...props}) => {
          const listType = useContext(ListContext);
          if (listType === 'unordered') {
            return (
              <li className="!p-0 !m-0 flex items-start gap-2 relative" {...props}>
                <div className="pt-2 shrink-0">
                  <Sparkles  className="w-3 h-3 text-amber-500" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0 prose-p:my-1 text-gray-800 leading-relaxed">
                  {children}
                </div>
              </li>
            );
          }
          return <li className="!my-1 pl-1 prose-p:my-1 text-gray-800 leading-relaxed" {...props}>{children}</li>;
        },
        table: ({node, ...props}) => (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full divide-y divide-gray-300 border border-gray-200 rounded-lg overflow-hidden shadow-sm" {...props} />
          </div>
        ),
        thead: ({node, ...props}) => <thead className="bg-amber-50" {...props} />,
        th: ({node, ...props}) => <th className="px-4 py-3 text-left text-sm font-semibold text-amber-900 border-b border-amber-200" {...props} />,
        td: ({node, ...props}) => <td className="px-4 py-3 text-sm text-gray-600 border-b border-gray-100" {...props} />,
        img: ({node, ...props}) => <img className="rounded-xl max-h-[400px] object-contain shadow-md my-4 mx-auto border border-amber-100" {...props} />,
        a: ({node, ...props}) => <a target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
