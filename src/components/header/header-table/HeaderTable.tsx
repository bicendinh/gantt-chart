import styled from 'styled-components';
import { type Column } from 'types';
import HeaderTableItem from './HeaderTableItem';

const HeaderTableContainer = styled.div`
    display: inline-flex;
    overflow: hidden;
    line-height: initial;
    font-weight: 400;
    font-size: 1em;
    box-sizing: border-box;
    color-scheme: light;
    overflow: hidden;
    position: relative;
    display: flex;
`;

const HeaderTableContent = styled.div`
    overflow-x: auto;
    display: inline-flex;
    flex-flow: row nowrap;
    align-items: stretch;
    line-height: initial;
    position: relative;
    z-index: 2;
    contain: paint style layout;
    flex: 1 1 auto;
    overflow: hidden;
`;

export interface HeaderProps {
    columns: Column[];
}

const HeaderTable: React.FC<HeaderProps> = ({ columns }: HeaderProps) => {
    return (
        <HeaderTableContainer style={{ width: 656.969 }}>
            <HeaderTableContent>
                {columns.map((column) => (
                    <HeaderTableItem key={column.type} column={column} />
                ))}
            </HeaderTableContent>
        </HeaderTableContainer>
    );
};

export default HeaderTable;
