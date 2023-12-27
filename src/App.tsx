import type React from 'react';
import 'App.css';
import Gantt from 'components/gantt/Gantt';
import { TASK_DATA } from 'types/data-example';

const App: React.FunctionComponent = () => {
    return <Gantt treeTasks={TASK_DATA}/>;
};

export default App;
