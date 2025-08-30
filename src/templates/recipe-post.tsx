import { ChevronLeftIcon as BackIcon } from "@heroicons/react/24/solid";
import { graphql, Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React, { ReactNode, FunctionComponent } from "react";
import Helmet from "react-helmet";

import Content, { HTMLContent } from "../components/Content";
import Ingredients from "../components/Ingredients";
import Tag from "../components/Tag";

interface RecipePostTemplateProps {
  content: string | ReactNode;
  title: string;
  source?: string;
  duration: string;
  servings: number;
  ingredients: string[];
  subRecipes?: {
    title?: string;
    ingredients?: string[];
  }[];
  image?: IGatsbyImageData | string;
  tags: string[];
  contentComponent?: FunctionComponent<{ content: any }>;
  helmet?: ReactNode;
}

export const RecipePostTemplate = ({
  content,
  contentComponent,
  title,
  source,
  duration,
  servings,
  ingredients,
  subRecipes,
  image,
  tags,
  helmet,
}: RecipePostTemplateProps) => {
  const RecipeContent = contentComponent || Content;

  return (
    <div className="flex flex-col md:flex-row">
      {helmet || ""}
      <div className="bg-food md:min-w-[300px] md:max-w-[300px] md:h-screen p-8 text-white text-xl space-y-4 md:overflow-y-auto">
        <Link to="/" className="hover:underline">
          <BackIcon className="h-5 w-5 inline" /> Retour
        </Link>
        {typeof image === "string" ? (
          <img
            className="h-48 w-full object-cover rounded-md border-2 border-white"
            src={image}
          />
        ) : image ? (
          <GatsbyImage
            className="h-48 rounded-md border-2 border-white"
            image={image}
            alt={title}
          />
        ) : null}
        {duration && (
          <p>
            <span className="font-bold">Durée :</span> {duration}
          </p>
        )}
        <Ingredients
          ingredients={ingredients}
          servings={servings}
          subRecipes={subRecipes}
        />
      </div>

      <div className="py-8 px-4 md:px-8 md:h-screen md:overflow-y-auto">
        <p className="text-6xl">{title}</p>
        {source?.startsWith("http") ? (
          <a href={source} className="text-gray-300 hover:underline">
            {source}
          </a>
        ) : source ? (
          <p className="text-gray-300">{source}</p>
        ) : null}
        <div className="flex flex-wrap gap-1 mb-4  mt-1">
          {tags.map((tag) => (
            <Tag key={tag} name={tag} />
          ))}
        </div>

        <RecipeContent content={content} />
      </div>
    </div>
  );
};

export default function RecipePost({ data }: Props) {
  const { markdownRemark: recipe } = data;

  return (
    <RecipePostTemplate
      content={recipe.html}
      contentComponent={HTMLContent}
      helmet={
        <Helmet>
          <title>{recipe.frontmatter.title}</title>
        </Helmet>
      }
      duration={recipe.frontmatter.duration}
      servings={recipe.frontmatter.servings}
      ingredients={recipe.frontmatter.ingredients}
      subRecipes={recipe.frontmatter.subRecipes}
      image={recipe.frontmatter.image?.childImageSharp.gatsbyImageData}
      tags={recipe.frontmatter.tags}
      title={recipe.frontmatter.title}
      source={recipe.frontmatter.source}
    />
  );
}

interface Props {
  data: {
    markdownRemark: {
      id: string;
      html: string;
      frontmatter: {
        title: string;
        source?: string;
        duration: string;
        servings: number;
        ingredients: string[];
        subRecipes: {
          title?: string;
          ingredients?: string[];
        }[];
        image?: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
        tags: string[];
      };
    };
  };
}

export const pageQuery = graphql`
  query RecipePostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        source
        duration
        servings
        ingredients
        subRecipes {
          title
          ingredients
        }
        image {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        tags
      }
    }
  }
`;
