import styled from 'styled-components';
import { type Task } from 'types';
import GanttControllerInstance from 'utils/GanttController';

import type React from 'react';
const TableRowContainer = styled.div`
    min-width: 100%;
    transform-style: flat;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    position: absolute;
    left: 0;
    overflow: hidden;
    border-bottom: 1px solid #e9eaeb;
    height: 45px;
    contain: layout;
`;

interface TableRowProps {
    task: Task;
    style: React.CSSProperties;
}

const TableRow: React.FC<TableRowProps> = ({ task, style }: TableRowProps) => {
    const { name, id } = task;

    const { isDragging, handleDragStart, handleDragEnd, handleDragOver } =
        GanttControllerInstance.useTaskRow(id);

    return (
        <TableRowContainer
            id={`task-${id}`}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            style={{
                ...style,
                opacity: isDragging ? 0.5 : 1
            }}
        >
            {name}
        </TableRowContainer>
    );
};

export default TableRow;
