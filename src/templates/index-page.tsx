import Fuse from 'fuse.js'
import { graphql, navigate } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import React, { useMemo } from 'react'
import Helmet from 'react-helmet'

import Footer from '../components/Footer'
import Hero from '../components/Hero'

import RecipesList from '../components/RecipesList'
import useStoredState from '../hooks/useStoredState'

const fuseOptions = {
  limit: 10,
  keys: ['title'],
  isCaseSensitive: false,
  includeMatches: true,
}

export interface Recipe {
  id: string
  title: string
  tags: string[]
  image?: IGatsbyImageData
  url: string
}

export default function IndexPage({ data }: Props) {
  const [searchString, setSearchString] = useStoredState('SEARCH_STRING', '')
  const [selectedTags, setSelectedTags] = useStoredState<string[]>('SELECTED_TAGS', [])

  const recipes: Recipe[] = data.allMarkdownRemark.edges.map((edge) => ({
    id: edge.node.id,
    title: edge.node.frontmatter.title,
    tags: edge.node.frontmatter.tags,
    image: edge.node.frontmatter.image?.childImageSharp.gatsbyImageData,
    url: edge.node.fields.slug,
  }))

  const tags = useMemo(() => {
    if (!recipes) {
      return undefined
    }
    const tags = recipes.reduce((acc, recipe) => {
      recipe.tags.forEach((t) => acc.add(t))
      return acc
    }, new Set<string>())
    return [...tags].sort()
  }, [recipes])

  const filteredRecipes = useMemo(() => {
    if (!searchString && selectedTags.length === 0) {
      return recipes
    }
    let filteredBySearchString: Recipe[] = recipes
    if (searchString) {
      const fuse = new Fuse(recipes, fuseOptions)
      const results = fuse.search(searchString)
      filteredBySearchString = results.map(({ item }) => item)
    }

    if (selectedTags.length > 0) {
      return filteredBySearchString.filter(
        (r) =>
          r.tags.filter((t) => selectedTags.some((st) => st === t)).length === selectedTags.length,
      )
    } else {
      return filteredBySearchString
    }
  }, [recipes, searchString, selectedTags])

  function handleRandomClick() {
    if (filteredRecipes.length === 0) {
      return
    }
    const randomIndex = Math.round(Math.random() * (filteredRecipes.length - 1))
    const randomRecipe = filteredRecipes[randomIndex]
    navigate(randomRecipe.url)
  }

  return (
    <>
      <Helmet>
        <title>{data.site.siteMetadata.title}</title>
      </Helmet>

      <Hero
        title={data.site.siteMetadata.title}
        tags={tags || []}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
        search={searchString}
        onSearchChange={setSearchString}
        onRandomClick={handleRandomClick}
      />

      <RecipesList recipes={filteredRecipes} selectedTags={selectedTags} />

      <Footer />
    </>
  )
}

interface Props {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
    allMarkdownRemark: {
      edges: Array<{
        node: {
          id: string
          fields: {
            slug: string
          }
          frontmatter: {
            title: string
            tags: string[]
            image?: {
              childImageSharp: {
                gatsbyImageData: IGatsbyImageData
              }
            }
          }
        }
      }>
    }
  }
}

export const pageQuery = graphql`
  query IndexPageTemplate {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "recipe-post" } } }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            tags
            image {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
      }
    }
  }
`
