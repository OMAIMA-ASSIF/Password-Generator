import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false); // ✅ manquant

  const generatePassword = () => {
    let chars = "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+{}[]:;,.<>?/";

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }).catch((err) => {
      console.error("Failed to copy: ", err);
    });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-r from-slate-950 to-blue-500 text-white min-h-screen relative ">
            <h1 className="text-4xl font-bold mb-4  mt-auto mb-5 text-center animate-bounce">Welcome and enjoy generating strong passwords </h1>
            <img src="" alt="" />

      <h1 className="text-2xl font-bold mb-4">Password Generator 🔐</h1>
      <div className="bg-slate-950/30 p-6 rounded-2xl shadow-md w-100 relative">
        <input
          type="text"
          value={password}
          readOnly
          className="w-full text-center bg-transparent border border-white/40 text-lg p-2 rounded-2xl focus:ring-2 outline-none transform transition-all duration-300 hover:scale-110 hover:shadow-lg mb-5"
        />
        <button
          onClick={copyToClipboard}
          className=" cursor-pointer absolute right-7 top-8 text-xl text-gray-300 hover:text-white"
        >
          <FontAwesomeIcon icon={faCopy} />
        </button>

        <div className="mb-3">
          <label className="block"><span className="text-md font-medium">Password length : </span>{length}</label>
          <input
            type="range"
            min="6"
            max="20"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500 
             transition duration-300 hover:accent-blue-700"
          />
        </div>
        <div className="mb-3">
  <label className="flex items-center">
    <input
      type="checkbox"
      checked={includeNumbers}
      onChange={() => setIncludeNumbers(!includeNumbers)} // Mise à jour de l'état
      className="hidden"
    />
    <span
      className={`w-4 h-4 mr-4 rounded-full border-2 transition-all ${
        includeNumbers ? "bg-blue-500 border-blue-500" : "bg-gray-200 border-gray-400"
      } flex items-center justify-center`}
    >
      {includeNumbers && <span className="text-white text-xs">✓</span>}
    </span>
    <span className="text-md font-medium">Numbers</span>
  </label>
</div>

<div className="mb-3">
  <label className="flex items-center">
    <input
      type="checkbox"
      checked={includeSymbols}
      onChange={() => setIncludeSymbols(!includeSymbols)} // Mise à jour de l'état
      className="hidden"
    />
    <span
      className={`w-4 h-4 mr-4 rounded-full border-2 transition-all ${
        includeSymbols ? "bg-blue-500 border-blue-500" : "bg-gray-200 border-gray-400"
      } flex items-center justify-center`}
    >
      {includeSymbols && <span className="text-white text-xs">✓</span>}
    </span>
    <span className="text-md font-medium">Symbols</span>
  </label>
</div>

<div className="mb-3">
  <label className="flex items-center">
    <input
      type="checkbox"
      checked={includeUppercase}
      onChange={() => setIncludeUppercase(!includeUppercase)} // Mise à jour de l'état
      className="hidden"
    />
    <span
      className={`w-4 h-4 mr-4 rounded-full border-2 transition-all ${
        includeUppercase ? "bg-blue-500 border-blue-500" : "bg-gray-200 border-gray-400"
      } flex items-center justify-center`}
    >
      {includeUppercase && <span className="text-white text-xs">✓</span>}
    </span>
    <span className="text-md font-medium">Uppercase</span>
  </label>
</div>

      </div>
      <button
          onClick={generatePassword}
          className=" cursor-pointer	 p-2 bg-blue-600 hover:bg-slate-900 rounded-2xl text-white font-bold transform transition-all duration-300 hover:scale-110 hover:shadow-lg mt-7"
        >
          Generate Password
        </button>

      {/* ✅ Alert visuelle */}
      {showAlert && (
        <div className="absolute top-4 right-4 bg-slate-900 text-white px-4 py-2 rounded-xl shadow-lg animate-fade-in">
          🔒 Password copied!
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;
