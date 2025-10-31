import React from 'react';
// Changed Link back to standard anchor tags (<a>) to prevent React Router context errors
// import { Link } from 'react-router-dom'; 

// Icon utility to replace lucide-react (used for icons)
const HomeIcon = ({ className }: { className: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L3 9v12h18V9l-9-7z" />
        <path d="M9 22V12h6v10" />
    </svg>
);

const UserPlusIcon = ({ className }: { className: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="17" y1="10" x2="17" y2="16" />
        <line x1="20" y1="13" x2="14" y2="13" />
    </svg>
);

const LogInIcon = ({ className }: { className: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        <polyline points="10 17 15 12 10 7" />
        <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
);


function Landing() {
    return (
        // Background changed to a light gradient
        <div className="min-h-screen w-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-center p-4 sm:p-6">

            {/* Container background changed to white/light gray */}
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden md:flex">

                {/* Left Section: Illustration/Icon (Light contrast) */}
                <div className="md:w-1/2 flex items-center justify-center p-8 bg-indigo-50">
                    <div className="text-center">
                        {/* Icon color changed to a prominent dark color */}
                        <HomeIcon className="w-24 h-24 mx-auto text-indigo-600 mb-4" />
                        <p className="text-lg text-indigo-700 font-medium">
                            Manage your properties with ease.
                        </p>
                    </div>
                </div>

                {/* Right Section: Content and CTAs */}
                <div className="md:w-1/2 p-8 flex flex-col justify-center text-center">
                    {/* Text colors updated for high contrast against the light background */}
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                        Your Property, <br className="hidden sm:inline" />Simplified.
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                        Efficiently manage rentals, tenants, and finances all in one place.
                    </p>

                    {/* Button Layout: Fixed to use flexbox properly with gap */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {/* Signup Button (Primary CTA) */}
                        <a
                            href="/signup"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 
                         text-lg font-semibold rounded-full shadow-lg 
                         bg-indigo-600 text-slate-100 hover:bg-indigo-700 
                         focus:outline-none focus:ring-4 focus:ring-indigo-300 
                         transition duration-300 ease-in-out transform hover:scale-[1.02]"
                        >
                            <UserPlusIcon className="w-5 h-5 text-white" />
                            <span className='text-white'>Get Started (Sign Up)</span>
                        </a>

                        {/* Login Button (Secondary CTA) */}
                        <a
                            href="/login"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 
                         text-lg font-semibold rounded-full shadow-lg 
                         bg-white text-indigo-600 border border-indigo-300
                         hover:bg-indigo-50 hover:border-indigo-400 
                         focus:outline-none focus:ring-4 focus:ring-indigo-200 
                         transition duration-300 ease-in-out transform hover:scale-[1.02]"
                        >
                            <LogInIcon className="w-5 h-5" />
                            Log In
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;
