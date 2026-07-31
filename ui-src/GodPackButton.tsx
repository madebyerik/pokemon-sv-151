import { a, useTransition } from "@react-spring/web";
import { useEffect, useState } from "react";
import type { Action, State } from "./reducer";
import { getGodPack } from "./selectors";
import HyperRare from "./svgs/rarities/hyper-rare.svg?react";
import Button from "./Button";

const GodPackButton = ({
  state,
  dispatch,
}: {
  state: State;
  dispatch: (action: Action) => void;
}) => {
  // Causes the cooldown state to update even if nothing else re-renders.
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(Date.now()), 1_000);
    return () => window.clearInterval(intervalId);
  }, []);

  const isVisible =
    !state.overlay.collectionVisible && !state.packs.current.opened;

  const cooldownActive =
    state.packs.godPackCooldownEndsAt !== null &&
    now < state.packs.godPackCooldownEndsAt;

  const isDisabled = state.packs.godPackEnabled || cooldownActive;

  const transitions = useTransition(isVisible, {
    from: { transform: "translateX(-500px)" },
    enter: { transform: "translateX(0px)" },
    leave: { transform: "translateX(-500px)" },
    config: { tension: 220, friction: 26 },
  });

  return transitions(
    (style, item) =>
      item && (
        <a.div style={style}>
          <Button
            modifier={["icon", "circle", "golden"]}
            disabled={isDisabled}
            aria-label="Enable god pack"
            aria-pressed={state.packs.godPackEnabled}
            onClick={() => {
              // Defensive guard: protects against rapid/repeated clicks.
              if (isDisabled) return;

              dispatch({ type: "ENABLE_GOD_PACK" });
              dispatch({ type: "SET_NEW_CURRENT_PACK", cards: getGodPack(state) });
            }}
          >
            <HyperRare />
          </Button>
        </a.div>
      ),
  );
};

export default GodPackButton;