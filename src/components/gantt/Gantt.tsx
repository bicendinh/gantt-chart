import GanttTable from 'components/gantt-table/GanttTable';
import GanttTimeline from 'components/gantt-timeline/GanttTimeline';
import Header from 'components/header/Header';
import styled from 'styled-components';
import { type Task } from 'types';
import { GanttController } from 'utils/GanttController';
import GanttSplitter from './GanttSplitter';

const GanttContainer = styled.div`
    position: relative;
    flex: 1;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: var(--primary-background-color);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

const GanttContent = styled.div`
    overflow-y: auto;
    flex: 1 1 0;
    contain: strict;
    position: relative;
    overflow-anchor: none;
    overflow: hidden;
    color: var(--secondary-text-color);
`;

const GanttInner = styled.div`
    height: 1886px;
    min-height: 100%;
    position: absolute;
    display: flex;
    flex-flow: row nowrap;
    overflow: hidden;
    width: 100%;
    align-items: stretch;
    box-sizing: border-box;
`;

interface GanttProps {
    treeTasks: Task[];
}

const ganttController = new GanttController();
const GanttProvider = ganttController.GanttProvider;

const Gantt: React.FC<GanttProps> = ({ treeTasks }: GanttProps) => {
    return (
        <GanttProvider treeTasks={treeTasks}>
            <GanttContainer>
                <Header />
                <GanttContent>
                    <GanttInner>
                        <GanttTable />
                        <GanttSplitter />
                        <GanttTimeline />
                    </GanttInner>
                </GanttContent>
            </GanttContainer>
        </GanttProvider>
    );
};

export default Gantt;
