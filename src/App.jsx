import AppLayout from './components/AppLayout';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="flex h-dvh flex-col divide-y">
      <Navbar />
      <AppLayout />
    </div>
  );
}

export default App;
