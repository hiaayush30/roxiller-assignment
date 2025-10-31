const Loader2 = ({ className }: { className: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4"></path>
        <path d="m15 4.5 1.5-1.5"></path>
        <path d="M18.5 6l1.5-1.5"></path>
        <path d="M22 12h-4"></path>
        <path d="m19.5 15-1.5 1.5"></path>
        <path d="M18.5 18.5l-1.5 1.5"></path>
        <path d="M12 22v-4"></path>
        <path d="m4.5 15 1.5 1.5"></path>
        <path d="M6 18.5l-1.5 1.5"></path>
        <path d="M2 12h4"></path>
        <path d="m4.5 9-1.5-1.5"></path>
        <path d="M6 4.5l-1.5-1.5"></path>
    </svg>
);


export const SimpleLoader = ({ message = "Loading content..." }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
            <p className="mt-4 text-gray-600 text-sm font-medium">{message}</p>
        </div>
    );
};



export const FullPageLoader = ({ message = "Loading, please wait..." }) => {
    return (
        <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-50/90 backdrop-blur-sm"
            aria-label="Loading"
            role="status"
        >
            <div className="p-8 bg-white rounded-xl shadow-2xl flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                <p className="mt-4 text-lg font-semibold text-gray-700">
                    {message}
                </p>
            </div>
        </div>
    );
};

