import type React from 'react';
import styled from 'styled-components';
import { COLUMN_DATA } from 'types/data-example';
import HeaderTable from './header-table/HeaderTable';
import HeaderTimeline from './header-timeline/HeaderTimeline';

const HeaderContainer = styled.header`
    display: flex;
    flex-direction: row;
    background-color: var(--label-background-color);
    z-index: 4;
    box-shadow: var(--box-shadow-header);
`;

const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <HeaderTable columns={COLUMN_DATA} />
            <HeaderTimeline />
        </HeaderContainer>
    );
};

export default Header;
