import React from 'react'

import { RecipePostTemplate } from '../../templates/recipe-post'

const RecipePostPreview = ({ entry, getAsset, widgetFor, widgetsFor }) => {
  const data = entry.get('data').toJS()
  return (
    <RecipePostTemplate
      content={widgetFor('body')}
      title={data.title || ''}
      duration={data.duration || ''}
      servings={data.servings || 1}
      ingredients={data.ingredients || []}
      subRecipes={data.subRecipes || []}
      image={getAsset(entry.getIn(['data', 'image']))?.url}
      tags={data.tags || []}
      source={data.source || ''}
    />
  )
}

export default RecipePostPreview
