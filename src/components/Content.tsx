import React from 'react'

export const HTMLContent = ({ content }: { content: any }) => (
  <div className="text-lg px-8 py-4" dangerouslySetInnerHTML={{ __html: content }} />
)

const Content = ({ content }: { content: any }) => (
  <div className="text-lg px-8 py-4">{content}</div>
)

export default Content
