import type { ComponentPropsWithoutRef } from 'react'
import ReactMarkdown from 'react-markdown'
import hljs from 'highlight.js/lib/core'
import java from 'highlight.js/lib/languages/java'

hljs.registerLanguage('java', java)

type MarkdownRendererProps = {
  children: string
}

export function MarkdownRenderer({ children }: MarkdownRendererProps) {
  return <ReactMarkdown components={{ code: CodeBlock }}>{children}</ReactMarkdown>
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
