class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-slate-200 max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="icon-circle-alert text-3xl text-red-600"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-6">We're sorry, but an unexpected error occurred in the application.</p>
            <button
              onClick={() => {
                localStorage.removeItem('ce_logged_in_prn');
                window.location.reload();
              }}
              className="bg-slate-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-900 transition-colors"
            >
              Reset & Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const API_BASE_URL = 'http://localhost:5000/api';

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

function App() {
  const [prn, setPrn] = React.useState('');
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // Check login state on mount
  React.useEffect(() => {
      try {
          const savedPrn = localStorage.getItem('ce_logged_in_prn');
          if (savedPrn) {
              setPrn(savedPrn);
              setIsAuthenticated(true);
          }
      } catch (err) {
          console.error("Local storage error:", err);
      }
  }, []);

  const handleLogin = (studentPrn) => {
      setPrn(studentPrn);
      setIsAuthenticated(true);
      try {
          localStorage.setItem('ce_logged_in_prn', studentPrn);
      } catch (err) {
          console.error("Local storage save error:", err);
      }
  };

  const handleLogout = () => {
      setPrn('');
      setIsAuthenticated(false);
      try {
          localStorage.removeItem('ce_logged_in_prn');
      } catch (err) {
          console.error("Local storage remove error:", err);
      }
  };

  try {
    return (
      <div data-name="app" data-file="app.js">
        {!isAuthenticated ? (
            <Login onLogin={handleLogin} />
        ) : (
            <Dashboard prn={prn} onLogout={handleLogout} />
        )}
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
