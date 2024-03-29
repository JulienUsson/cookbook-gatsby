import React from 'react'

import Tag from './Tag'

interface Props {
  title: string
  tags: string[]
  selectedTags: string[]
  search: string
  onRandomClick: () => void
  onTagsChange?: (tags: string[]) => void
  onSearchChange?: (searchStringselectedTags: string) => void
}

export default function Hero({
  title,
  tags,
  selectedTags,
  search,
  onRandomClick,
  onTagsChange,
  onSearchChange,
}: Props) {
  function handleTagSelected(tag: string) {
    let newSelectedTags
    if (selectedTags.includes(tag)) {
      newSelectedTags = selectedTags.filter((t) => t !== tag)
    } else {
      newSelectedTags = [...selectedTags, tag]
    }

    onTagsChange?.(newSelectedTags)
  }

  return (
    <div className="bg-food h-screen/2 pb-10vh flex flex-col items-center justify-center">
      <p className="text-4xl md:text-6xl text-white text-center mb-4 md:mb-8">{title}</p>
      <input
        className="border hover:border-2 hover:-m-[1px] border-white bg-transparent rounded-md px-4 py-3 focus:outline-none text-lg text-white placeholder:text-white"
        placeholder="Rechercher une recette"
        value={search}
        onChange={(e) => onSearchChange?.(e.target.value)}
      />
      <div className="flex flex-row flex-wrap justify-center mt-4 gap-2 md:w-1/2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag)
          return (
            <Tag
              key={tag}
              name={tag}
              selected={isSelected}
              color="#fff"
              onClick={() => handleTagSelected(tag)}
            />
          )
        })}
      </div>
      <div className="mt-4" />
      <button
        onClick={onRandomClick}
        className="rounded-md p-1 border hover:border-2 hover:-m-[1px] hover:font-bold border-white text-white text-sm"
      >
        Une recette au hasard ?
      </button>
    </div>
  )
}
