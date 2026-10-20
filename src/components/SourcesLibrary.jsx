import { groupSources } from "../source-groups.js";

export default function SourcesLibrary({
  witcherOneSources,
  witcherTwoSources,
  continuitySources,
}) {
  const groups = groupSources({
    witcherOneSources,
    witcherTwoSources,
    continuitySources,
  });

  return (
    <div className="source-groups">
      {groups.map((game) => (
        <details className="source-game-group" key={game.id}>
          <summary className="source-group-heading">
            <span>{game.title}</span>
            <span className="source-group-count">
              {game.count} {game.count === 1 ? "source" : "sources"}
            </span>
          </summary>
          {game.types.map((type) => (
            <details className="source-type-group" key={type.label}>
              <summary className="source-type-heading">
                <span>{type.label}</span>
                <span className="source-group-count">
                  {type.sources.length}
                </span>
              </summary>
              <div className="source-list">
                {type.sources.map((source, index) => (
                  <a
                    className="source-entry"
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    key={source.id}
                  >
                    <span className="source-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="eyebrow">{source.kind}</span>
                      <strong>{source.title}</strong>
                      <p>{source.detail}</p>
                      <small>{new URL(source.url).hostname}</small>
                    </span>
                  </a>
                ))}
              </div>
            </details>
          ))}
        </details>
      ))}
    </div>
  );
}
