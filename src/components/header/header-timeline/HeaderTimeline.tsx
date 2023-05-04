import styled from 'styled-components';

const HeaderTimelineContainer = styled.div`
    overflow: hidden;
    position: relative;
    display: flex;
    line-height: initial;
    font-weight: 400;
    font-size: 1em;
    color-scheme: light;
`;

const HeaderTimeline: React.FC = () => <HeaderTimelineContainer />;

export default HeaderTimeline;
