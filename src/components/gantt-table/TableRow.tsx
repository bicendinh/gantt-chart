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
    style: React.CSSProperties;
}

const TableRow: React.FC<TableRowProps> = ({ task, style }: TableRowProps) => {
    const { name } = task;
    return <TableRowContainer style={style}>{name}</TableRowContainer>;
};

export default TableRow;
