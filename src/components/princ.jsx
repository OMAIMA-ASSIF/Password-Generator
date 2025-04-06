import PasswordGenerator from "./PasswordGenerator.jsx"; // adjust the path if needed

function princ() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <header className="my-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome</h1>
        <img 
          src="https://via.placeholder.com/150"  // Replace with your image URL
          alt="Welcome" 
          className="w-32 h-32 rounded-full mx-auto shadow-lg"
        />
      </header>
      <main>
        <PasswordGenerator />
      </main>
    </div>
  );
}
export default princ;

