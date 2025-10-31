import { useState, type ChangeEvent, type FormEvent } from 'react';
import { NavLink } from 'react-router-dom';

// Icon utility to replace lucide-react (used for the checkmark)
const LockIcon = ({ className }: { className: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);


function Login() {
  // Mock state for form inputs (only email and password needed for login)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<{ name: string, value: string }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Login Data Submitted:', formData);

    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      // In a real app, you would handle successful login and navigation here
      alert('Login simulated! Check console for data.');
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 w-screen">

      {/* Main Card Container: Uses the same sleek styling as the Signup form */}
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl border border-gray-100">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              disabled={isSubmitting}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150"
            />
          </div>

          {/* Submit Button (Updated text and icon) */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
                            w-full flex justify-center items-center gap-2 py-2.5 px-4 
                            border border-transparent text-lg font-semibold rounded-lg shadow-lg 
                            transition duration-300 ease-in-out
                            ${isSubmitting
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-xl'}
                        `}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </>
            ) : (
              <>
                <LockIcon className="w-5 h-5" />
                Log In
              </>
            )}
          </button>
        </form>

        {/* Footer Link (Updated to link to Signup) */}
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?
            <NavLink to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
              Sign up here
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
