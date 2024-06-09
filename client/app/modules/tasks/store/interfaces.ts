import { AgendaEntry } from "react-native-calendars";


export interface TaskApi {
    id: string;
    date: {
      _seconds: number;
      _nanoseconds: number;
    };
    user_id: string;
    title: string;
    category: string;
    description?: string;
    completed: boolean;
  
}

export interface TaskUI {
  date: string;
  user_id: string;
  description: string;
  completed: boolean;
  title: string;
  category: string;
}

export interface TaskUIWithID extends TaskUI{
  id: string;
}

interface AgendaTask {
  id: string;
  name: string;
  height: number;
  day: string;
}

export interface GroupedTasks {
  [key: string]: AgendaTask[];
}

export interface AgendaEntryUI extends AgendaEntry{
  id: string;
}