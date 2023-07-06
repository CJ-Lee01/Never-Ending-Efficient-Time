import { Session, User } from "@supabase/supabase-js";
import { ChangeEventHandler, ReactElement } from "react";

export interface InputFormFieldProps {
  type?: string;
  changeHandler: ChangeEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
  isRequired?: boolean;
  placeholder?: string;
  borderColor?: string;
  size?: string;
}

export interface UserData {
  user: User | null;
  session: Session | null;
}

export interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
  href: string;
}

export interface featureDescription {
  heading: string;
  icon: string;
  description: string;
}

export interface eventInformation {
  id?: string;
  user_id?: string;
  event_name: string;
  event_description: string;
  start_time: Date;
  end_time: Date;
}

export interface TasksInformation {
  id?: number;
  user_id?: string;
  canvas_id: number;
  title: string;
  description: string;
  is_complete: boolean;
  deadline: string;
}

export interface TimerDataType {
  id?: number;
  user_id?: string;
  title: string;
  intervals: number;
  totalSeconds: number;
  totalSecondsTwo?: number;
  intervalName?: string;
  intervalNameTwo?: string;
}

export interface LapDataType {
  totalSeconds: number;
}

export interface AnnouncementData {
  id?: number;
  user_id?: string;
  course_name: string;
  title: string;
  description: string;
  is_read: boolean;
  announced_at: Date;
}

export interface ProfileType {
  id?: number;
  created_at?: Date;
  full_name?: string;
  avatar_url?: string;
}
