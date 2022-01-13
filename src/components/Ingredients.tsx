import MinusIcon from '@heroicons/react/solid/MinusIcon'
import PlusIcon from '@heroicons/react/solid/PlusIcon'
import React, { useState, useMemo, useEffect, Fragment } from 'react'

interface Ingredient {
  quantity?: number
  unit?: string
  name: string
}

function strToIngredient(ingredient: string): Ingredient | undefined {
  const regex = /^([0-9.]+)([a-zA-Zèàé]*) (.*)$/gi

  if (regex.test(ingredient)) {
    // reset regex
    regex.lastIndex = 0
    const args = regex.exec(ingredient)
    if (!args) {
      return undefined
    }
    return {
      quantity: Number.parseFloat(args[1]),
      unit: args[2] || undefined,
      name: args[3],
    }
  } else {
    return { name: ingredient }
  }
}

interface Props {
  ingredients: string[]
  servings: number
  subRecipes?: {
    title?: string
    ingredients?: string[]
  }[]
}

function formatNumber(number: number): string {
  const str = number.toString()
  if (str.indexOf('.') !== -1) {
    return number.toFixed(2)
  }
  return str
}

export default function Ingredients({ ingredients, servings: servingsProp, subRecipes }: Props) {
  const [servings, setServings] = useState<number>(servingsProp)
  useEffect(() => {
    setServings(servingsProp)
  }, [servingsProp])

  return (
    <>
      <div>
        <p className="font-bold">Personnes :</p>
        <div className="flex flex-row align-center gap-x-4">
          <button
            onClick={() => {
              if (servings > 1) {
                setServings(servings - 1)
              }
            }}
          >
            <MinusIcon className="h-5 w-5" />
          </button>
          <p>{servings}</p>
          <button onClick={() => setServings(servings + 1)}>
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div>
        <p className="font-bold">Ingrédients :</p>
        <IngredientsList ingredients={ingredients} quantityFactor={servings / servingsProp} />
        {subRecipes?.map((subRecipe) => (
          <div key={subRecipe.title} className="pt-2">
            <p className="font-bold">{subRecipe.title} :</p>
            <IngredientsList
              ingredients={subRecipe.ingredients}
              quantityFactor={servings / servingsProp}
            />
          </div>
        ))}
      </div>
    </>
  )
}

interface IngredientsListProps {
  ingredients?: string[]
  quantityFactor: number
}

function IngredientsList({ ingredients: ingredientsProp, quantityFactor }: IngredientsListProps) {
  const parsedIngredients = useMemo(
    () => (ingredientsProp || []).map(strToIngredient).filter((x) => x) as Ingredient[],
    [ingredientsProp],
  )
  const ingredients = useMemo(() => {
    return parsedIngredients.map((i) => ({
      ...i,
      quantity: i.quantity && i.quantity * quantityFactor,
    }))
  }, [parsedIngredients, quantityFactor])

  return (
    <>
      {ingredients.map((ingredient, index) => (
        <p key={index}>
          -{' '}
          {ingredient.quantity && (
            <span>
              {formatNumber(ingredient.quantity)}
              {ingredient.unit}{' '}
            </span>
          )}
          {ingredient.name}
        </p>
      ))}
    </>
  )
}
