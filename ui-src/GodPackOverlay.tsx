import { State } from "./reducer";

import './GodPackOverlay.css';

const GodPackOverlay = ({
  state,
}: {
  state: State;
}) => {
  return (
    state.packs.godPackEnabled && !state.overlay.collectionVisible
    ? <div className="c-god-pack-overlay" aria-hidden="true">
        <div className="c-god-pack-overlay__border" aria-hidden="true" />
        <div className="c-god-pack-overlay__sheen" aria-hidden="true" />
      </div>
    : null
  );
};

export default GodPackOverlay;