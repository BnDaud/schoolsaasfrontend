// NotFound.jsx
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Oops! Page not found.</p>
      <a
        href="/"
        className="mt-6 px-6 py-3 text-green outline-3 rounded hover:bg-green hover:text-white font-bold transition"
      >
        Go Home
      </a>
    </div>
  );
}
