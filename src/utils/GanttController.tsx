import {
    type Dispatch,
    type SetStateAction,
    useEffect,
    useState,
    useContext,
    createContext,
    type ReactNode
} from 'react';
import { type Task } from 'types';
import { getFlatTasks } from 'utils';
import { GanttElementIds } from './constant';

// Define the context type
interface GanttContextType {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
}

// Create a provider component
interface GanttProviderProps {
    children: ReactNode;
    treeTasks: Task[];
}

export class GanttController {
    private static instance: GanttController | null = null;

    private currentDragTaskId: string | null = null;

    // Create the context
    private readonly GanttContext = createContext<GanttContextType | undefined>(
        undefined
    );

    public tasks: Task[] = [];

    private setTasksHook: Dispatch<SetStateAction<Task[]>> | null = null;

    constructor () {
        if (GanttController.instance == null) {
            this.tasks = [];
            GanttController.instance = this;
        }
        return GanttController.instance;
    }

    public setTasks (tasks: Task[]): void {
        this.tasks = tasks;
        if (this.setTasksHook !== null) {
            this.setTasksHook(tasks);
        }
    }

    private getTaskRowEl (taskId: string) {
        return document.getElementById(`task-${taskId}`);
    }

    private isAncestor (taskId: string, ancestorId: string): boolean {
        for (const task of this.tasks) {
            if (task.id !== taskId) continue;
            if (task.parentId === ancestorId) return true;

            if (task.parentId !== undefined) this.isAncestor(task.parentId, ancestorId);
        }

        return false;
    }

    private getTaskDrag (e: React.DragEvent) {
        const taskEls = this.tasks.map(({ id }) => ({
            id,
            el: this.getTaskRowEl(id)
        }));
        const currentClientY = e.clientY;
        let nearestElement: typeof taskEls[0] | any;
        let minDistance = Number.MAX_SAFE_INTEGER;

        taskEls.forEach((task) => {
            const taskRect = task.el?.getBoundingClientRect();

            const taskTranslateY =
                (taskRect?.top ?? 0) - (task.el?.offsetTop ?? 0);

            if (Math.abs(taskTranslateY - currentClientY) < minDistance) {
                nearestElement = task;
                minDistance = Math.abs(taskTranslateY - currentClientY);
            }
        });

        return {
            taskId: nearestElement?.id ?? '',
            el: nearestElement?.el as HTMLElement
        };
    }

    private drawIndicator (e: React.DragEvent) {
        // Get the GANTT_CONTENT and INDICATOR elements by their ids
        const ganttContent = document.getElementById(
            GanttElementIds.GANTT_CONTENT
        );
        let indicator = document.getElementById(GanttElementIds.INDICATOR);

        // Check if GANTT_CONTENT exist before appending
        if (ganttContent === null) return;

        if (indicator === null) {
            // Create a new div element for the INDICATOR
            indicator = document.createElement('div');

            // Set the id of the indicator
            indicator.id = GanttElementIds.INDICATOR;

            // Append the indicator to the GANTT_CONTENT
            ganttContent.appendChild(indicator);
        }

        const { el, taskId } = this.getTaskDrag(e);

        const taskRect = el.getBoundingClientRect();
        if (this.isAncestor(taskId, this.currentDragTaskId ?? '')) {
            indicator.className = 'row-drop-indicator drag-invalid';
        } else {
            indicator.className = 'row-drop-indicator';
        }

        indicator.style.transform = `translateY(${
            (taskRect.top - el.offsetTop) - ganttContent.offsetTop
        }px)`;
    }

    private removeIndicator () {
        // Get the GANTT_CONTENT and INDICATOR elements by their ids
        const ganttContent = document.getElementById(
            GanttElementIds.GANTT_CONTENT
        );
        const indicator = document.getElementById(GanttElementIds.INDICATOR);
        if (ganttContent === null || indicator === null) return;
        ganttContent.removeChild(indicator);
    }

    public useTaskRow (taskId: string) {
        const [isDragging, setIsDragging] = useState(false);

        const handleDragStart = (e: React.DragEvent): void => {
            setIsDragging(true);
            this.currentDragTaskId = taskId;
            const taskRowEl = this.getTaskRowEl(taskId);
            if (taskRowEl !== null) {
                e.dataTransfer.setDragImage(taskRowEl, 0, 0);
            }
        };

        const handleDragEnd = (): void => {
            setIsDragging(false);
            this.removeIndicator();
        };

        const handleDragOver = (e: React.DragEvent): void => {
            this.drawIndicator(e);
        };

        return { isDragging, handleDragStart, handleDragEnd, handleDragOver };
    }

    public GanttProvider: React.FC<GanttProviderProps> = ({
        children,
        treeTasks
    }) => {
        this.tasks = getFlatTasks(treeTasks);
        const [tasks, setTasks] = useState<Task[]>(this.tasks);

        useEffect(() => {
            this.setTasksHook = setTasks;
        }, []);

        const contextValue: GanttContextType = {
            tasks,
            setTasks
        };

        return (
            <this.GanttContext.Provider value={contextValue}>
                {children}
            </this.GanttContext.Provider>
        );
    };

    useGanttContext = (): Task[] => {
        const context = useContext(this.GanttContext);
        if (context == null) {
            throw new Error(
                'useGanttContext must be used within a GanttProvider'
            );
        }
        return context.tasks;
    };
}

const GanttControllerInstance = new GanttController();

export default GanttControllerInstance;
