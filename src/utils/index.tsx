import { type Task } from 'types';

const convertToFlatTasks = (
    treeTasks: Task[],
    flatTasks: Task[],
    level: number
): void => {
    treeTasks.forEach((task) => {
        task.level = level;
        flatTasks.push(task);
        if (typeof task.subtasks !== 'undefined' && task.subtasks?.length > 0) {
            convertToFlatTasks(task.subtasks, flatTasks, level + 1);
        }
    });
};

export const getFlatTasks = (treeTasks: Task[]): Task[] => {
    const flatTasks: Task[] = [];
    convertToFlatTasks(treeTasks, flatTasks, 1);
    return flatTasks;
};
