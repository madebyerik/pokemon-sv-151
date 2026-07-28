import { Action, State } from "./reducer";
import Back from "./svgs/back.svg?react";
import { CollectionRef } from "./useCollection";
import Viewer from "./viewer/Viewer";
import Button from "./Button";
import CollectionButton from "./CollectionButton";
import AddToFigmaButton from "./AddToFigmaButton";
import BackToCollectionButton from "./BackToCollectionButton";
import CardNotCollected from "./CardNotCollected";
import GodPackButton from "./GodPackButton";
import GodPackOverlay from "./GodPackOverlay";

import './Canvas.css';

const Canvas = ({
  canvasRef,
  collectionRef,
  state,
  dispatch
}: {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  collectionRef: CollectionRef;
  state: State;
  dispatch: (action: Action) => void;
}) => {
  return (
    <div className="c-canvas">
      <div className="c-canvas__controls c-canvas__controls--top c-canvas__controls--left">
        <BackToCollectionButton
          state={state}
          dispatch={dispatch} />
        <GodPackButton
          state={state}
          dispatch={dispatch} />
      </div>
      <div className="c-canvas__controls c-canvas__controls--top c-canvas__controls--right">
        <CollectionButton 
          state={state}
          dispatch={dispatch} />
        <AddToFigmaButton
          collectionRef={collectionRef}
          state={state}
          dispatch={dispatch} />
      </div>
      <div className="c-canvas__controls c-canvas__controls--middle c-canvas__controls--center c-canvas__controls--disabled">
        <CardNotCollected
          state={state} />
      </div>
      <Viewer
        canvasRef={canvasRef}
        state={state}
        dispatch={dispatch} />
      <GodPackOverlay
        state={state} />
    </div>
  );
};

export default Canvas;