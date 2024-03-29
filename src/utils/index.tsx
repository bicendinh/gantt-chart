import { type Task } from 'types';

const convertToFlatTasks = (
    treeTasks: Task[],
    parent: Task | null,
    flatTasks: Task[],
    level: number
): void => {
    treeTasks.forEach((task) => {
        task.level = level;
        task.parentId = parent?.id;
        flatTasks.push(task);
        if (typeof task.subtasks !== 'undefined' && task.subtasks?.length > 0) {
            convertToFlatTasks(task.subtasks, task, flatTasks, level + 1);
        }
    });
};

export const getFlatTasks = (treeTasks: Task[]): Task[] => {
    const flatTasks: Task[] = [];
    convertToFlatTasks(treeTasks, null, flatTasks, 1);
    return flatTasks;
};
