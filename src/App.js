import DeleteAbleRowsTable from './Components/DeleteAbleRowsTable';
import ZoomableLineChart from './Components/ZoomableGraph';

const App = () => {
  return (
    <div className='App' style={{ minWidth: '400px', minHeight: '100vh' }}>
      <ZoomableLineChart />
    </div>
  );
};

export default App;
