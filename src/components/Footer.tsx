import React from 'react'

export default function Footer() {
  return (
    <div className="mb-8 text-center">
      <p className="text-">
        Fait avec amour par{' '}
        <a
          className="text-primary-700 hover:underline"
          href="https://github.com/JulienUsson/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Julien Usson
        </a>
      </p>
      <a className="text-gray-300 hover:underline" href="/admin/" color="textSecondary">
        Admin
      </a>
    </div>
  )
}
