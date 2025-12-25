import { Action, PokemonType, State } from "./reducer";
import { capitalize } from "./helpers";
import TypeIcon from "./TypeIcon";

const CollectionTypeFilter = ({
  state,
  dispatch
}: {
  state: State;
  dispatch: (action: Action) => void;
}) => {
  const { filters } = state.overlay;
  const handleTypeChip = (type: PokemonType) => {
    let newFilters = [...filters.types];
    if (newFilters.includes("ALL")) newFilters = [];
    if (filters.types.includes(type)) {
      newFilters = [...filters.types].filter(t => t !== type);
    } else {
      newFilters = [...newFilters, type];
    }
    if (newFilters.length === 0) newFilters = ["ALL"];
    dispatch({
      type: "SET_COLLECTION_FILTER",
      filters: {
        ...filters,
        types: newFilters
      }
    });
  };
  return (
    <div className="c-collection-sidebar__section">
      <h5>
        Types
      </h5>
      <div className="c-collection-sidebar__chip-group">
        {
          (["COLORLESS", "DARKNESS", "DRAGON", "FIGHTING", "FIRE", "GRASS", "LIGHTNING", "PSYCHIC", "WATER"] as PokemonType[]).map((t, i) => (
            <button
              className={`c-collection-sidebar__chip ${filters.types.includes(t) ? `c-collection-sidebar__chip--active` : ''} c-collection-sidebar__chip--${t.split("_").join(" ").toLowerCase()}`} 
              id={t}
              onClick={() => handleTypeChip(t)}>
              <TypeIcon type={t} />
              <span>{capitalize(t.split("_").join(" "))}</span>
            </button>
          ))
        }
      </div>
    </div>
  );
};

export default CollectionTypeFilter;