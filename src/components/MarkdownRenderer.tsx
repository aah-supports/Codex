import { useState, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import hljs from 'highlight.js/lib/core'
import java from 'highlight.js/lib/languages/java'

hljs.registerLanguage('java', java)

type MarkdownRendererProps = {
  children: string
  copyCode?: boolean
}

export function MarkdownRenderer({ children, copyCode = false }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      components={{
        code: CodeBlock,
        pre: (props) => <CodePre {...props} copyCode={copyCode} />,
      }}
    >
      {children}
    </ReactMarkdown>
  )
}

function CodePre({
  children,
  copyCode,
  ...props
}: ComponentPropsWithoutRef<'pre'> & {
  copyCode: boolean
}) {
  const [copied, setCopied] = useState(false)
  const code = extractText(children)

  async function copy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1300)
  }

  if (!copyCode) {
    return <pre {...props}>{children}</pre>
  }

  return (
    <div className="code-copy-frame">
      <button type="button" className="code-copy-button" onClick={() => void copy()}>
        {copied ? 'Copié' : 'Copier'}
      </button>
      <pre {...props}>{children}</pre>
    </div>
  )
}

function extractText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(extractText).join('')
  }

  if (node && typeof node === 'object' && 'props' in node) {
    return extractText((node as { props: { children?: ReactNode } }).props.children)
  }

  return ''
}

function CodeBlock({ className, children, ...props }: ComponentPropsWithoutRef<'code'>) {
  const code = String(children ?? '').replace(/\n$/, '')
  const language = /language-(\w+)/.exec(className ?? '')?.[1]

  if (language === 'java') {
    return (
      <code
        className="hljs language-java"
        dangerouslySetInnerHTML={{ __html: hljs.highlight(code, { language: 'java' }).value }}
      />
    )
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  )
}
