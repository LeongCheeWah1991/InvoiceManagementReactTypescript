
import Container from '@mui/material/Container';
import './App.css';
import DashboardPage from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Container maxWidth="xl" style={{ height: "90vh"}} >
        <DashboardPage />
      </Container>
    </div>
  );
}

export default App;
