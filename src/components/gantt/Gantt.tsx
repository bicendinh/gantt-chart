import Header from 'components/header/Header';
import styled from 'styled-components';

const GanttContainer = styled.div`
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: red;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

const GanttContent = styled.div`
    overflow-y: auto;
    flex: 1 1 0;
    contain: strict;
    position: relative;
    background-color: green;
    overflow-anchor: none;
    overflow: hidden;
    color: #4f5964;
`;

const GanttTimelineTemp = styled.div`
    height: 1886px;
    min-height: 100%;
    position: absolute;
    display: flex;
    flex-flow: row nowrap;
    overflow: hidden;
    width: 100%;
    align-items: stretch;
    background-color: blue;
    box-sizing: border-box;
`;

const Gantt: React.FC = () => {
    return (
        <GanttContainer>
            <Header />
            <GanttContent>
                <GanttTimelineTemp />
            </GanttContent>
        </GanttContainer>
    );
};

export default Gantt;
