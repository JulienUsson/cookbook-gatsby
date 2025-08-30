import CMS from "decap-cms-app";

import RecipePostPreview from "./preview-templates/RecipePostPreview";
import {
  IngredientsCategoriesControl,
  IngredientsCategoriesPreview,
  ingredientsSchema,
} from "./widgets/ingredients";

CMS.registerWidget(
  "ingredients",
  IngredientsCategoriesControl,
  IngredientsCategoriesPreview,
  ingredientsSchema
);
CMS.registerPreviewTemplate("recipes", RecipePostPreview);
