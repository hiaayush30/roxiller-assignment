import { useState, type ChangeEvent, type FormEvent } from 'react';
import { toast } from 'react-toastify';
// FIX: NavLink is a React Router component and crashes the app when the component is rendered outside of the router context.
// import { NavLink } from 'react-router-dom'; 

const CheckCircle = ({ className }: { className: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="M22 4L12 14.01l-3-3" />
  </svg>
);

// Define type for errors state
interface FormErrors {
  email?: string;
  name?: string;
  password?: string;
  address?: string;
}

function Signup() {
  // Mock state for form inputs
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    address: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // NEW: State to hold validation errors
  const [errors, setErrors] = useState<FormErrors>({});


  // Type definition for ChangeEvent needs to be external for e.target properties
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // NEW: Validation function
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const trimmedAddress = formData.address.trim();

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (formData.name.trim().length < 2) {
      newErrors.name = 'Full Name must be at least 2 characters.';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    // NEW VALIDATION: Address must be at least 6 characters
    if (trimmedAddress.length < 6) {
      newErrors.address = 'Address must be at least 6 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Check validation before proceeding
    if (!validate()) {
      toast("Validation failed. Check form errors.");
      return;
    }

    setIsSubmitting(true);
    console.log('Form Data Submitted:', formData);

    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      // NOTE: Using console.log instead of alert()
      console.log('Registration simulated! Check console for data.');
      // In a real app, you would navigate to the home page here
    }, 1500);
  };

  return (
    // FIX 1: Removed w-screen to prevent horizontal overflow and added p-6 for default padding
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6 min-w-screen">

      {/* FIX 2: Reduced max-w-md to max-w-sm for a slightly smaller form */}
      <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-2xl border border-gray-100">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Create Account
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Enter your details to register
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4"> {/* Added space-y-4 for consistent spacing */}

          {/* Email */}
          <div className='space-y-1'>
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
              className={`w-full text-black px-4 py-2 border rounded-lg shadow-sm transition duration-150 
                ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}
              `}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Full Name */}
          <div className='space-y-1'>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`w-full text-black px-4 py-2 border rounded-lg shadow-sm transition duration-150 
                ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}
              `}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Password */}
          <div className='space-y-1'>
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
              className={`w-full text-black px-4 py-2 border rounded-lg shadow-sm transition duration-150 
                ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}
              `}
            />
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Address */}
          <div className='space-y-1'>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              id="address"
              name="address"
              rows={3}
              required
              placeholder="123 Main St, City, State, ZIP"
              value={formData.address}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`w-full px-4 py-2 border text-black rounded-lg shadow-sm transition duration-150 resize-none
                ${errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}
              `}
            ></textarea>
            {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            // Button is disabled if submitting OR if there are any current errors.
            disabled={isSubmitting || Object.keys(errors).length > 0}
            className={`
                            w-full flex justify-center items-center gap-2 py-2.5 px-4 
                            border border-transparent text-lg font-semibold rounded-lg shadow-lg 
                            transition duration-300 ease-in-out mt-6
                            ${isSubmitting || Object.keys(errors).length > 0
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
                Registering...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Sign Up
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Already have an account?
            {/* FIX: Changed NavLink back to a standard anchor tag to prevent context errors */}
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
              Log in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
