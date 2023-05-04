import { type Task } from 'types';

export const convertToFlatTasks = (
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
