import type React from 'react';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { type Task } from 'types';

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
    flatTasks: Task[];
    style: React.CSSProperties;
}

const TableRow: React.FC<TableRowProps> = ({ task, style, flatTasks }: TableRowProps) => {
    const { name, id } = task;

    const [isDragging, setIsDragging] = useState(false);
    const dragRef = useRef<HTMLDivElement | null>(null);

    const handleDragStart = (e: React.DragEvent): void => {
        setIsDragging(true);
        if (dragRef.current !== null) {
            e.dataTransfer.setDragImage(dragRef.current, 0, 0);
        }
    };

    const handleDragEnd = (): void => {
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent): void => {
        console.log(e)
    }

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
            ref={dragRef}
        >
            {name}
        </TableRowContainer>
    );
};

export default TableRow;
