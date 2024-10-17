import './App.css'
import Routes from './Routes'; // Adjust the path as necessary
import { AuthProvider } from './store/authContext';
function App() {

  return (
    <AuthProvider>
    <>
                  <Routes />
    </>
        </AuthProvider>
  )
}

export default App
