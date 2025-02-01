import { BrowserRouter as Router } from 'react-router-dom';
import { FormLayout } from './components/FormLayout';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <FormLayout />
      <Toaster />
    </Router>
  );
}

export default App;