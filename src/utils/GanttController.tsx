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
        return document.getElementById(taskId);
    }

    private drawIndicator (e: React.DragEvent) {
        console.log(this.currentDragTaskId);
        // Get the GANTT_CONTENT and INDICATOR elements by their ids
        const ganttContent = document.getElementById(
            GanttElementIds.GANTT_CONTENT
        );
        let indicator = document.getElementById(GanttElementIds.INDICATOR);
        if (ganttContent === null) return;
        // Check if both elements exist before appending
        if (indicator === null) {
            // Create a new div element for the INDICATOR
            indicator = document.createElement('div');

            // Set the id of the indicator
            indicator.id = GanttElementIds.INDICATOR;
            indicator.className = 'row-drop-indicator';

            // Append the indicator to the GANTT_CONTENT
            ganttContent.appendChild(indicator);
        }

        indicator.style.transform = `translateY(${e.clientY}px)`;
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
