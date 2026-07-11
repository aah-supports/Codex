import { useState, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import hljs from 'highlight.js/lib/core'
import java from 'highlight.js/lib/languages/java'

hljs.registerLanguage('java', java)

type MarkdownRendererProps = {
  children: string
  copyCode?: boolean
  copyText?: boolean
}

export function MarkdownRenderer({ children, copyCode = false, copyText = false }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      components={{
        code: CodeBlock,
        pre: (props) => <CodePre {...props} copyCode={copyCode} />,
        p: (props) => <CopyableParagraph {...props} copyText={copyText} />,
        li: (props) => <CopyableListItem {...props} copyText={copyText} />,
      }}
    >
      {children}
    </ReactMarkdown>
  )
}

function CopyButton({ value, className }: { value: string; className: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1300)
  }

  return (
    <button type="button" className={className} onClick={() => void copy()}>
      {copied ? 'Copié' : 'Copier'}
    </button>
  )
}

function CopyableParagraph({
  children,
  copyText,
  ...props
}: ComponentPropsWithoutRef<'p'> & {
  copyText: boolean
}) {
  if (!copyText) {
    return <p {...props}>{children}</p>
  }

  return (
    <div className="text-copy-block">
      <p {...props}>{children}</p>
      <CopyButton value={extractText(children)} className="text-copy-button" />
    </div>
  )
}

function CopyableListItem({
  children,
  copyText,
  ...props
}: ComponentPropsWithoutRef<'li'> & {
  copyText: boolean
}) {
  if (!copyText) {
    return <li {...props}>{children}</li>
  }

  return (
    <li {...props} className={['copyable-list-item', props.className].filter(Boolean).join(' ')}>
      <span>{children}</span>
      <CopyButton value={extractText(children)} className="text-copy-button" />
    </li>
  )
}

function CodePre({
  children,
  copyCode,
  ...props
}: ComponentPropsWithoutRef<'pre'> & {
  copyCode: boolean
}) {
  const code = extractText(children)

  if (!copyCode) {
    return <pre {...props}>{children}</pre>
  }

  return (
    <div className="code-copy-frame">
      <CopyButton value={code} className="code-copy-button" />
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
