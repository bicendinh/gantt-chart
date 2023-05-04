import type React from 'react';
import styled from 'styled-components';
import { type Column } from 'types';

const HeaderTableItemTitle = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1 1 0;
    width: 0;
    font-size: 0.9em;
`;

const HeaderTableItemContainer = styled.div`
    overflow: visible;
    cursor: pointer;
    border-right-color: transparent;
    user-select: none;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
    color: var(--primary-text-color);
    outline: none;
    border-inline-end: 1px solid var(--layout-border-color);
    text-transform: uppercase;
`;
const HeaderTableItemContent = styled.div`
    border-bottom: none;
    transition: background-color 0.2s;
    flex-direction: row;
    user-select: none;
    padding: 1em 0;
    white-space: nowrap;
    position: relative;
    font-weight: 500;
    display: flex;
    align-items: center;
    overflow: hidden;
`;

export interface HeaderItemProps {
    column: Column;
}

const HeaderTableItem: React.FC<HeaderItemProps> = ({ column }) => {
    const { title } = column;
    return (
        <HeaderTableItemContainer style={{ minWidth: 150, flexBasis: 250 }}>
            <HeaderTableItemContent>
                <HeaderTableItemTitle>{title}</HeaderTableItemTitle>
            </HeaderTableItemContent>
        </HeaderTableItemContainer>
    );
};

export default HeaderTableItem;
