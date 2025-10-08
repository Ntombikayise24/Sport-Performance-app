export type Player = {
  id: string;
  name: string;
  position: string;
  status: 'Fit' | 'Injured' | 'On Leave' | 'Recovering' | 'Suspended';
};
