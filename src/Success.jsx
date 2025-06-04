import { useLocation, useNavigate } from "react-router-dom";

export default function Success() {
  const { state } = useLocation();
  const navigate = useNavigate();
  if (!state) return <div className="text-center mt-10 text-white">No data found!</div>;

  return (
    <div
      className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1549088521-94b6502fec3d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] 
      bg-cover bg-center flex items-center justify-center"
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/30 shadow-xl text-white p-8 rounded-2xl w-full max-w-xl mx-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">🌟 Submission Successful</h2>
        <ul className="space-y-2">
          {Object.entries(state).map(([key, value]) =>
            key !== "showPassword" ? (
              <li key={key}>
                <span className="capitalize font-semibold">{key}:</span> {value}
              </li>
            ) : null
          )}
        </ul>
        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-white  font-semibold py-2 rounded hover:bg-gray-200 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
