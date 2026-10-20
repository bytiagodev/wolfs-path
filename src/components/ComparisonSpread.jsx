import { assetUrl } from "../asset-url.js";
import { comparisonLayouts, getBookTitle } from "../visual-guide.js";
import { publicationArtwork } from "../artwork.js";

export default function ComparisonSpread({ article }) {
  const layout = comparisonLayouts[article.id];
  const bookTitle = getBookTitle(article.id);
  if (article.id === "other-games") {
    const games = ["thronebreaker", "rogue-mage", "gwent", "adventure-game"];
    return (
      <div className="sidegame-comparison-grid">
        {games.map((identifier, index) => {
          const artwork = publicationArtwork.find(
            (publication) => publication.id === identifier,
          );
          return (
            <section className="sidegame-comparison" key={identifier}>
              <figure>
                <img src={assetUrl(artwork.path)} alt={artwork.caption} />
                <figcaption>{artwork.title} imagery</figcaption>
              </figure>
              <div>
                <p className="eyebrow">
                  {index < 2 ? "Earlier campaigns" : "Other formats"}
                </p>
                <h2>{artwork.title}</h2>
                <p>{article.paragraphs[index]}</p>
              </div>
            </section>
          );
        })}
      </div>
    );
  }
  return (
    <div className="comparison-spread">
      <div className="comparison-columns">
        <section className="comparison-column">
          <div className="comparison-column-copy">
            <p className="eyebrow">{layout.leftLabel ?? "In the books"}</p>
            {bookTitle && <p className="comparison-book-title">{bookTitle}</p>}
            {layout.left.map((index) => (
              <p key={index}>{article.paragraphs[index]}</p>
            ))}
          </div>
        </section>
        <section className="comparison-column">
          <div className="comparison-column-copy">
            <p className="eyebrow">{layout.rightLabel ?? "In the games"}</p>
            {layout.right.map((index) => (
              <p key={index}>{article.paragraphs[index]}</p>
            ))}
          </div>
        </section>
      </div>
      {layout.context.length > 0 && (
        <div className="comparison-context">
          <h2>{layout.contextLabel ?? "Context and evidence"}</h2>
          {layout.context.map((index) => (
            <p key={index}>{article.paragraphs[index]}</p>
          ))}
        </div>
      )}
    </div>
  );
}
