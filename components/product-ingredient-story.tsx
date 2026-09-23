import Link from "next/link";
import { INGREDIENT_STORY } from "@/lib/homepage";

export function ProductIngredientStory({
  ingredients,
}: {
  ingredients: string[];
}) {
  if (!ingredients.length) return null;

  return (
    <section
      className="product-ingredients"
      aria-labelledby="ingredients-title"
    >
      <div className="product-ingredients__intro">
        <h2 id="ingredients-title">What&apos;s inside</h2>
        <p>
          A closer look at the ingredients chosen for this formula.
          <Link href="/about#ingredients">Explore the ingredient stories.</Link>
        </p>
      </div>
      <ul>
        {ingredients.map((ingredient) => {
          const story = INGREDIENT_STORY.find(
            (entry) => entry.name.toLowerCase() === ingredient.toLowerCase(),
          );

          return (
            <li key={ingredient}>
              <h3>{ingredient}</h3>
              {story ? <p>{story.body}</p> : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
