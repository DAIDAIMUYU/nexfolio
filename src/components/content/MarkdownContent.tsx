import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { normalizeRichTextContent } from '../../lib/listFields';

type MarkdownContentProps = {
  content: string | string[] | null | undefined;
  className?: string;
};

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  const value = normalizeRichTextContent(content);

  if (!value) {
    return null;
  }

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, ...props }) => {
            const isExternal = Boolean(href && /^(https?:)?\/\//.test(href));
            return (
              <a
                {...props}
                href={href}
                rel={isExternal ? 'noreferrer' : undefined}
                target={isExternal ? '_blank' : undefined}
              />
            );
          },
          img: ({ alt, src, ...props }) => <img {...props} alt={alt ?? ''} loading="lazy" src={src} />,
        }}
      >
        {value}
      </ReactMarkdown>
    </div>
  );
}
