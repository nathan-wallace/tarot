import { PropsWithChildren, createContext, useContext, useReducer } from 'react';

export type AchievementId = 'first-reading' | 'five-readings' | 'ten-readings';

interface State {
  completedReadings: number;
  milestones: Set<AchievementId>;
}

const initialState: State = {
  completedReadings: 0,
  milestones: new Set(),
};

type Action = { type: 'add-reading' } | { type: 'load', payload: State };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'load':
      return {
        completedReadings: action.payload.completedReadings,
        milestones: new Set(action.payload.milestones),
      };
    case 'add-reading':
      const completed = state.completedReadings + 1;
      const milestones = new Set(state.milestones);
      if (completed >= 1) milestones.add('first-reading');
      if (completed >= 5) milestones.add('five-readings');
      if (completed >= 10) milestones.add('ten-readings');
      return { completedReadings: completed, milestones };
    default:
      return state;
  }
}

const AchievementsContext = createContext<{
  state: State;
  addReading: () => void;
} | null>(null);

export function AchievementsProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addReading = () => dispatch({ type: 'add-reading' });

  return (
    <AchievementsContext.Provider value={{ state, addReading }}>
      {children}
    </AchievementsContext.Provider>
  );
}

export function useAchievements() {
  const ctx = useContext(AchievementsContext);
  if (!ctx) throw new Error('useAchievements must be used within AchievementsProvider');
  return ctx;
}
