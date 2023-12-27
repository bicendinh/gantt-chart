/* eslint-disable @typescript-eslint/naming-convention */
import { type Column, type Task } from 'types';
import { v4 as uuidv4 } from 'uuid';

const child1_task1: Task = {
    id: uuidv4(),
    type: 'task',
    name: 'Child 1 - Task 1',
    startTime: '2017-01-02',
    duration: 100000,
    progress: 0.9,
    isDisabled: false,
    hideChildren: false
};

const child2_task1: Task = {
    id: uuidv4(),
    type: 'task',
    name: 'Child 2 - Task 1',
    startTime: '2017-01-02',
    duration: 103000,
    progress: 0.9,
    isDisabled: false,
    hideChildren: false
};

const task1: Task = {
    id: uuidv4(),
    type: 'task',
    name: 'Task 1',
    startTime: '2017-01-02',
    duration: 1320000,
    progress: 0.4,
    isDisabled: false,
    hideChildren: false,
    subtasks: [child1_task1, child2_task1]
};

const child2_task2: Task = {
    id: uuidv4(),
    type: 'task',
    name: 'Child 2 - Task 2',
    startTime: '2017-01-02',
    duration: 104000,
    progress: 0.4,
    isDisabled: false,
    hideChildren: false
};

const task2: Task = {
    id: uuidv4(),
    type: 'task',
    name: 'Task 2',
    startTime: '2017-01-02',
    duration: 123000,
    progress: 0.4,
    isDisabled: false,
    hideChildren: false,
    subtasks: [child2_task2]
};

const child1_task3: Task = {
    id: uuidv4(),
    type: 'task',
    name: 'Child 1 - Task 3',
    startTime: '2017-01-02',
    duration: 95000,
    progress: 0.6,
    isDisabled: false,
    hideChildren: false
};

const task3: Task = {
    id: uuidv4(),
    type: 'task',
    name: 'Task 3',
    startTime: '2017-01-02',
    duration: 900000,
    progress: 0.2,
    isDisabled: false,
    hideChildren: false,
    subtasks: [child1_task3]
};

const task4: Task = {
    id: uuidv4(),
    type: 'task',
    name: 'Task 4',
    startTime: '2017-01-02',
    duration: 800000,
    progress: 0.7,
    isDisabled: false,
    hideChildren: false
};

const child1_task5: Task = {
    id: uuidv4(),
    type: 'task',
    name: 'Child 1 - Task 5',
    startTime: '2017-01-02',
    duration: 120000,
    progress: 0.5,
    isDisabled: false,
    hideChildren: false
};

const task5: Task = {
    id: uuidv4(),
    type: 'task',
    name: 'Task 5',
    startTime: '2017-01-02',
    duration: 600000,
    progress: 0.3,
    isDisabled: false,
    hideChildren: false,
    subtasks: [child1_task5]
};

const child1_task6: Task = {
    id: uuidv4(),
    type: 'task',
    name: 'Child 1 - Task 6',
    startTime: '2017-01-02',
    duration: 300000,
    progress: 0.8,
    isDisabled: false,
    hideChildren: false
};

const task6: Task = {
    id: uuidv4(),
    type: 'task',
    name: 'Task 6',
    startTime: '2017-01-02',
    duration: 450000,
    progress: 0.6,
    isDisabled: false,
    hideChildren: false,
    subtasks: [child1_task6]
};

export const TASK_DATA = [task1, task2, task3, task4, task5, task6];

const column1: Column = {
    type: 'id',
    title: 'Id'
};

const column2: Column = {
    type: 'name',
    title: 'Name'
};

const column3: Column = {
    type: 'duration',
    title: 'Duration'
};

const column4: Column = {
    type: 'startdate',
    title: 'Start Date'
};

export const COLUMN_DATA = [column1, column2, column3, column4];
