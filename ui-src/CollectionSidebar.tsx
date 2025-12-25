import { a, useTransition } from "@react-spring/web";
import { Action, State } from "./reducer";
import CollectionSidebarHeader from "./CollectionSidebarHeader";
import CollectionQueryFilter from "./CollectionQueryFilter";
import CollectionRarityFilter from "./CollectionRarityFilter";
import CollectionTypeFilter from "./CollectionTypeFilter";
import './CollectionSidebar.css';

const CollectionSidebar = ({
  state,
  dispatch
}: {
  state: State;
  dispatch: (action: Action) => void;
}) => {
  const transitions = useTransition(state.overlay.filtersVisible, {
    from: { transform: "translateX(100%)", opacity: 0 },
    enter: { transform: "translateX(0%)", opacity: 1 },
    leave: { transform: "translateX(100%)", opacity: 0 },
  });
  return (
    transitions((transitionStyle, item) =>
      item &&
      <div className="c-collection-sidebar-wrap">
        <a.div className="c-collection-sidebar__scrim"
          style={{
            opacity: transitionStyle.opacity
          }}
          onClick={() => {
            dispatch({
              type: "TOGGLE_FILTERS_OVERLAY",
              visible: false
            })
          }} />
        <a.div
          className="c-collection-sidebar" 
          style={{
            transform: transitionStyle.transform
          }}>
          <div className="c-collection-sidebar__scroll">
            <CollectionSidebarHeader
              state={state}
              dispatch={dispatch} />
            <CollectionQueryFilter
              state={state}
              dispatch={dispatch} />
            <CollectionRarityFilter
              state={state}
              dispatch={dispatch} />
            <CollectionTypeFilter
              state={state}
              dispatch={dispatch} />
          </div>
        </a.div>
      </div>
    )
  );
};

export default CollectionSidebar;