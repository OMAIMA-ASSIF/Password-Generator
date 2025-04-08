import { useState, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faDownload, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+{}[]:;,.<>?/";

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const generatePassword = useCallback(() => {
    if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols) {
      alert("Please select at least one character type.");
      return;
    }

    let chars = "";
    if (includeLowercase) chars += LOWERCASE;
    if (includeUppercase) chars += UPPERCASE;
    if (includeNumbers) chars += NUMBERS;
    if (includeSymbols) chars += SYMBOLS;

    const generated = Array.from({ length }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");

    setPassword(generated);
  }, [length, includeLowercase, includeUppercase, includeNumbers, includeSymbols]);

  const copyToClipboard = useCallback(() => {
    if (!password) return;
    navigator.clipboard.writeText(password)
      .then(() => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
      })
      .catch((err) => console.error("Copy failed", err));
  }, [password]);

  const exportPassword = () => {
    const blob = new Blob([password], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "password.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Enter") generatePassword();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [generatePassword]);

  return (
    <div className={`${darkMode ? "bg-slate-950 text-white" : "bg-white text-gray-900"} flex flex-col items-center p-6 min-h-screen transition-colors duration-300`}>
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-600 transition"
          title="Toggle Dark Mode"
        >
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </button>
      </div>

      <h1 className="text-4xl font-bold mt-auto mb-5 text-center animate-bounce">Welcome and enjoy generating strong passwords</h1>
      <h1 className="text-2xl font-bold mb-4">Password Generator 🔐</h1>
      
      <div className={`p-6 rounded-2xl shadow-md w-100 relative ${darkMode ? "bg-slate-800" : "bg-gray-100"}`}>
        <input
          type="text"
          value={password}
          readOnly
          className={`w-full text-center bg-transparent border ${darkMode ? "border-white/40 text-white" : "border-gray-400 text-gray-800"} text-lg p-2 rounded-2xl focus:ring-2 outline-none transition-all duration-300 hover:scale-110 hover:shadow-lg mb-5`}
        />
        
        <div className="flex justify-between items-center mb-5">
          <button onClick={copyToClipboard} className="text-xl text-blue-400 hover:text-blue-600 transition">
            <FontAwesomeIcon icon={faCopy} /> Copy
          </button>
          <button onClick={exportPassword} className="text-xl text-green-400 hover:text-green-600 transition">
            <FontAwesomeIcon icon={faDownload} /> Export
          </button>
        </div>

        <div className="mb-3">
          <label className="block font-medium">Password length: {length}</label>
          <input
            type="range"
            min="6"
            max="20"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-500 transition"
          />
        </div>

        {[
          { label: "Lowercase", checked: includeLowercase, onChange: () => setIncludeLowercase(!includeLowercase) },
          { label: "Uppercase", checked: includeUppercase, onChange: () => setIncludeUppercase(!includeUppercase) },
          { label: "Numbers", checked: includeNumbers, onChange: () => setIncludeNumbers(!includeNumbers) },
          { label: "Symbols", checked: includeSymbols, onChange: () => setIncludeSymbols(!includeSymbols) },
        ].map(({ label, checked, onChange }) => (
          <div className="mb-3" key={label}>
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" checked={checked} onChange={onChange} className="hidden" />
              <span
                className={`w-4 h-4 mr-4 rounded-full border-2 transition-all ${
                  checked ? "bg-blue-500 border-blue-500" : "bg-gray-300 border-gray-400"
                } flex items-center justify-center`}
              >
                {checked && <span className="text-white text-xs">✓</span>}
              </span>
              <span className="text-md font-medium">{label}</span>
            </label>
          </div>
        ))}
      </div>

      <button
        onClick={generatePassword}
        className="p-2 mt-7 bg-blue-600 hover:bg-blue-800 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-110 shadow-md"
      >
        Generate Password
      </button>

      {showAlert && (
        <div className="absolute top-4 left-4 bg-green-700 text-white px-4 py-2 rounded-xl shadow-lg animate-fade-in">
          🔒 Password copied!
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;
