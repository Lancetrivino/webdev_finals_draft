export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Welcome to Eventure</h1>
      <p className="text-gray-700 max-w-lg mb-6">
        Manage and join school events effortlessly. Eventure connects administrators and participants in one platform.
      </p>
      <a
        href="/login"
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Get Started
      </a>
    </div>
  );
}
