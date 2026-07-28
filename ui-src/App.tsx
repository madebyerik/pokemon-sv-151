import { useRef, useReducer } from "react";
import reducer, { Card, State } from "./reducer";
import { getPackCards, getGodPack, displayPack } from "./selectors";
import cardData from "./data/cards_merged.json";
import usePluginStorage from "./usePluginStorage";
import Canvas from "./Canvas";
import "./App.css";
import Collection from "./Collection";
import useCollection from "./useCollection";

const CARDS_BY_ID = Object.fromEntries(
  cardData.map(card => [card.ext.tcgl.cardID, card as Card])
);

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    overlay: {
      collectionVisible: false,
      filtersVisible: false,
      selectedCardId: null,
      filters: {
        query: "",
        rarities: ["ALL"],
        types: ["ALL"],
        sort: "index"
      }
    },
    packs: {
      current: {
        id: "starter",
        cards: getPackCards({ cardsById: CARDS_BY_ID } as State),
        opened: false,
        cardIndex: 0
      },
      available: Infinity,
      lastOpened: null,
      godPackEnabled: false,
      godPackCooldownEndsAt: null
    },
    collection: {
      cards: {}
    },
    cardsById: CARDS_BY_ID,
    hydrated: false
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const collectionRef = useCollection(state);

  usePluginStorage(
    state, 
    dispatch
  );
  
  return (
    <main className="c-app">
      <section className="c-app__body">
        <Canvas
          state={state}
          dispatch={dispatch}
          canvasRef={canvasRef}
          collectionRef={collectionRef} />
        <Collection
          state={state}
          dispatch={dispatch} />
      </section>
    </main>
  );
};

export default App;