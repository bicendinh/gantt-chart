/* eslint-disable @typescript-eslint/no-invalid-void-type */
export type DefaultTheme = 'default-theme' | 'dark-theme';

export enum ViewMode {
    Hour = 'Hour',
    QuarterDay = 'Quarter Day',
    HalfDay = 'Half Day',
    Day = 'Day',
    Week = 'Week',
    Month = 'Month',
    QuarterYear = 'QuarterYear',
    Year = 'Year'
}

export type TaskType = 'task' | 'milestone' | 'project';
export interface Task {
    id: string;
    type: TaskType;
    name: string;
    startTime: string;
    duration: number; // milisecond
    progress: number;
    styles?: {
        backgroundColor?: string;
        backgroundSelectedColor?: string;
        progressColor?: string;
        progressSelectedColor?: string;
    };
    isDisabled?: boolean;
    project?: string;
    dependencies?: string[];
    hideChildren?: boolean;
    displayOrder?: number;
    subtasks?: Task[];
}

export type ColumnType = 'id' | 'name' | 'startdate' | 'duration';
export interface Column {
    type: ColumnType;
    title: string;
    width?: number;
}

export interface EventOption {
    /**
     * Time step value for date changes.
     */
    timeStep?: number;
    /**
     * Invokes on bar select on unselect.
     */
    onSelect?: (task: Task, isSelected: boolean) => void;
    /**
     * Invokes on bar double click.
     */
    onDoubleClick?: (task: Task) => void;
    /**
     * Invokes on bar click.
     */
    onClick?: (task: Task) => void;
    /**
     * Invokes on end and start time change. Chart undoes operation if method return false or error.
     */
    onDateChange?: (
        task: Task,
        children: Task[]
    ) => void | boolean | Promise<void> | Promise<boolean>;
    /**
     * Invokes on progress change. Chart undoes operation if method return false or error.
     */
    onProgressChange?: (
        task: Task,
        children: Task[]
    ) => void | boolean | Promise<void> | Promise<boolean>;
    /**
     * Invokes on delete selected task. Chart undoes operation if method return false or error.
     */
    onDelete?: (
        task: Task
    ) => void | boolean | Promise<void> | Promise<boolean>;
    /**
     * Invokes on expander on task list
     */
    onExpanderClick?: (task: Task) => void;
}

export interface DisplayOption {
    viewMode?: ViewMode;
    viewDate?: Date;
    preStepsCount?: number;
    locale?: string;
    rtl?: boolean;
}

export interface GanttProps extends EventOption, DisplayOption {
    tasks: Task[];
}
