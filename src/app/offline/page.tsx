'use client';

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-white text-black dark:bg-black dark:text-white">
      <h1 className="text-3xl font-bold mb-4">You are offline</h1>
      <p className="text-lg text-gray-500 mb-8">
        Please check your internet connection and try again.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
      >
        Retry
      </button>
    </div>
  );
}
