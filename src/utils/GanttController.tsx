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

const instance = new GanttController();

export default instance;
