import { State } from "./reducer";

import './GodPackOverlay.css';

const GodPackOverlay = ({
  state,
}: {
  state: State;
}) => {
  return (
    state.packs.godPackEnabled && !state.overlay.collectionVisible
    ? <div className="c-god-pack-overlay" aria-hidden="true" />
    : null
  );
};

export default GodPackOverlay;