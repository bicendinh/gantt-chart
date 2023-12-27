import styled from 'styled-components';
import { type Task } from 'types';
import { ROW_HEIGHT } from 'utils/constant';
import TableRow from './TableRow';
import { GanttController } from 'utils/GanttController';

const GanttTableContainer = styled.div`
    flex: 3 1 0%;
    overflow-x: auto;
    overscroll-behavior: contain auto;
    position: relative;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    overflow-anchor: none;
    display: inline-flex;
    line-height: initial;
    font-weight: 400;
    font-size: 1em;
    box-sizing: border-box;
    color-scheme: light;
`;

const GanttTable: React.FC = () => {
    const flatTasks: Task[] = new GanttController().useGanttContext();

    return (
        <GanttTableContainer>
            {flatTasks.map((task, index) => (
                <TableRow
                    key={task.id}
                    task={task}
                    flatTasks={flatTasks}
                    style={{
                        height: ROW_HEIGHT,
                        transform: `translate(0px, ${index * ROW_HEIGHT}px)`
                    }}
                />
            ))}
        </GanttTableContainer>
    );
};

export default GanttTable;
