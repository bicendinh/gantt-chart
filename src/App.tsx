import React, { useState } from 'react';
import './App.css';
import Button from './components/Button';
import { type DefaultTheme } from './types/public';

const App: React.FunctionComponent = () => {
    const [themeMode, setThemeMode] = useState<DefaultTheme>('default-theme');
    return (
        <div className={`App ${themeMode}`}>
            <Button
                onClick={() => {
                    setThemeMode(
                        themeMode === 'dark-theme'
                            ? 'default-theme'
                            : 'dark-theme'
                    );
                }}
            >
                Mode
            </Button>
        </div>
    );
};

export default App;
