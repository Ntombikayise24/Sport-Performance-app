import { TrainingTemplate } from "./TrainingTemplate";

export type WeeklyPlan = {
  [playerId: string]: {
    [day: string]: TrainingTemplate;
  };
};
