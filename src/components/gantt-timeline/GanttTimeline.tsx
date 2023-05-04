import styled from 'styled-components';

const GanttTimelineContainer = styled.div`
    flex: 4 1 0%;
    overflow-x: auto;
    user-select: none;
    overscroll-behavior: contain auto;
    position: relative;
    overflow: hidden;
    overflow-anchor: none;
`;

const GanttTimeline: React.FC = () => {
    return <GanttTimelineContainer />;
};

export default GanttTimeline;
