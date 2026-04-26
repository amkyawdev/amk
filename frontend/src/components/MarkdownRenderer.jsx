import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

const CodeBlock = ({ children, className }) => {
  const language = className?.replace('language-', '') || 'text';
  return (
    <div style={{
      background: '#1a1a1a',
      borderRadius: '8px',
      padding: '12px',
      margin: '8px 0',
      overflow: 'auto',
      position: 'relative',
    }}>
      {language !== 'text' && (
        <span style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          fontSize: '10px',
          color: '#ffffff',
          background: '#222222',
          padding: '2px 8px',
          borderRadius: '4px',
        }}>
          {language}
        </span>
      )}
      <pre style={{
        margin: 0,
        fontFamily: "'Fira Code', 'Consolas', monospace",
        fontSize: '14px',
        color: '#ffffff',
      }}>
        <code>{children}</code>
      </pre>
    </div>
  );
};

const InlineCode = ({ children }) => {
  return (
    <code style={{
      background: '#222222',
      padding: '2px 6px',
      borderRadius: '4px',
      fontFamily: "'Fira Code', 'Consolas', monospace",
      fontSize: '14px',
      color: '#ffffff',
    }}>
      {children}
    </code>
  );
};

const MarkdownRenderer = ({ content, isBot = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={isBot ? 'message-bot' : ''}
      style={{
        paddingLeft: isBot ? '12px' : 0,
        borderLeft: isBot ? '3px solid #FFD700' : 'none',
        marginBottom: '12px',
      }}
    >
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            if (inline) {
              return <InlineCode>{children}</InlineCode>;
            }
            return <CodeBlock className={className}>{String(children).replace(/\n$/, '')}</CodeBlock>;
          },
          p({ children }) {
            return <p style={{ marginBottom: '8px', lineHeight: 1.6 }}>{children}</p>;
          },
          h1({ children }) {
            return <h1 style={{ fontSize: '24px', color: '#ffffff', marginBottom: '12px' }}>{children}</h1>;
          },
          h2({ children }) {
            return <h2 style={{ fontSize: '20px', color: '#ffffff', marginBottom: '10px' }}>{children}</h2>;
          },
          h3({ children }) {
            return <h3 style={{ fontSize: '18px', color: '#ffffff', marginBottom: '8px' }}>{children}</h3>;
          },
          ul({ children }) {
            return <ul style={{ paddingLeft: '20px', marginBottom: '8px' }}>{children}</ul>;
          },
          ol({ children }) {
            return <ol style={{ paddingLeft: '20px', marginBottom: '8px' }}>{children}</ol>;
          },
          li({ children }) {
            return <li style={{ marginBottom: '4px' }}>{children}</li>;
          },
          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#ffffff', textDecoration: 'underline' }}
              >
                {children}
              </a>
            );
          },
          blockquote({ children }) {
            return (
              <blockquote style={{
                borderLeft: '3px solid #FFD700',
                paddingLeft: '12px',
                marginLeft: 0,
                color: '#b0b0b0',
                fontStyle: 'italic',
              }}>
                {children}
              </blockquote>
            );
          },
          table({ children }) {
            return (
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  marginBottom: '8px',
                }}>
                  {children}
                </table>
              </div>
            );
          },
          th({ children }) {
            return (
              <th style={{
                background: '#222222',
                padding: '8px',
                textAlign: 'left',
                borderBottom: '2px solid #FFD700',
              }}>
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td style={{
                padding: '8px',
                borderBottom: '1px solid #111111',
              }}>
                {children}
              </td>
            );
          },
          hr() {
            return <hr style={{ border: 'none', borderTop: '1px solid #111111', margin: '16px 0' }} />;
          },
          strong({ children }) {
            return <strong style={{ color: '#ffffff' }}>{children}</strong>;
          },
          em({ children }) {
            return <em style={{ color: '#b0b0b0' }}>{children}</em>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </motion.div>
  );
};

export default MarkdownRenderer;