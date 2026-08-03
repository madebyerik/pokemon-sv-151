import { a, useTransition, to } from "@react-spring/web";
import { Action, State } from "./reducer";
import { getPackCards } from "./selectors";
import PokeBall from "./svgs/pokeball.svg?react"
import Button from "./Button";

const CollectionButton = ({
  state,
  dispatch
}: {
  state: State;
  dispatch: (action: Action) => void;
}) => {
  const transitions = useTransition(
    !state.overlay.collectionVisible && !state.packs.current.opened,
    {
      from: { transform: `translateX(500px)` },
      enter: { transform: `translateX(0px)` },
      leave: { transform: `translateX(500px)` },
      delay: 125,
      config: { tension: 220, friction: 26 }
    }
  );
  return transitions((style, item) =>
    item &&
    <a.div style={style}>
      <Button
        modifier={["icon", "circle"]}
        onClick={() => {
          if (state.packs.godPackEnabled) {
            dispatch({
              type: "DISABLE_GOD_PACK"
            });
            dispatch({ type: "SET_NEW_CURRENT_PACK", cards: getPackCards(state) });
          }
          dispatch({
            type: "TOGGLE_COLLECTION_OVERLAY",
            visible: true
          });
        }}>
        <PokeBall />
      </Button>
    </a.div>
  );
};

export default CollectionButton;