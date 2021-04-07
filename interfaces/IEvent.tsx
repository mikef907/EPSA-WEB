export interface IEvent {
  id: number | string;
  parentId: number | undefined;
  name: string;
  description: string;
  allDay: boolean;
  start: Date;
  end: Date | null;
  created_at?: Date;
  updated_at?: Date;
}
