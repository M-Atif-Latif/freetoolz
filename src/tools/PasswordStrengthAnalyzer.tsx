import { useState } from 'react';
import { Shield, Eye, EyeOff, Copy } from 'lucide-react';

export default function PasswordStrengthAnalyzer() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const analyzePassword = () => {
    const length = password.length;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);
    const hasRepeating = /(.)\1{2,}/.test(password);
    const hasSequential = /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(password);

    let score = 0;
    const checks: { label: string; passed: boolean }[] = [
      { label: 'At least 8 characters', passed: length >= 8 },
      { label: 'Contains lowercase letters', passed: hasLower },
      { label: 'Contains uppercase letters', passed: hasUpper },
      { label: 'Contains numbers', passed: hasNumber },
      { label: 'Contains special characters', passed: hasSpecial },
      { label: 'No repeating characters', passed: !hasRepeating },
      { label: 'No sequential characters', passed: !hasSequential },
    ];

    checks.forEach(check => { if (check.passed) score++; });

    let strength = 'Very Weak';
    let color = 'from-red-500 to-red-600';
    let percentage = 0;

    if (score >= 7) {
      strength = 'Very Strong';
      color = 'from-green-500 to-emerald-600';
      percentage = 100;
    } else if (score >= 6) {
      strength = 'Strong';
      color = 'from-blue-500 to-cyan-600';
      percentage = 80;
    } else if (score >= 4) {
      strength = 'Medium';
      color = 'from-yellow-500 to-orange-600';
      percentage = 60;
    } else if (score >= 2) {
      strength = 'Weak';
      color = 'from-orange-500 to-red-600';
      percentage = 40;
    } else if (password.length > 0) {
      strength = 'Very Weak';
      color = 'from-red-500 to-red-600';
      percentage = 20;
    }

    // Estimated crack time
    const charset = (hasLower ? 26 : 0) + (hasUpper ? 26 : 0) + (hasNumber ? 10 : 0) + (hasSpecial ? 32 : 0);
    const combinations = Math.pow(charset, length);
    const guessesPerSecond = 10000000000; // 10 billion
    const seconds = combinations / guessesPerSecond;

    let crackTime = '';
    if (seconds < 1) crackTime = 'Instantly';
    else if (seconds < 60) crackTime = 'Less than a minute';
    else if (seconds < 3600) crackTime = `${Math.floor(seconds / 60)} minutes`;
    else if (seconds < 86400) crackTime = `${Math.floor(seconds / 3600)} hours`;
    else if (seconds < 31536000) crackTime = `${Math.floor(seconds / 86400)} days`;
    else if (seconds < 3153600000) crackTime = `${Math.floor(seconds / 31536000)} years`;
    else crackTime = 'Centuries';

    return { strength, color, percentage, checks, crackTime, entropy: Math.log2(combinations).toFixed(1) };
  };

  const analysis = password ? analyzePassword() : null;

  const generatePassword = () => {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const all = lower + upper + numbers + special;

    let pwd = '';
    pwd += lower[Math.floor(Math.random() * lower.length)];
    pwd += upper[Math.floor(Math.random() * upper.length)];
    pwd += numbers[Math.floor(Math.random() * numbers.length)];
    pwd += special[Math.floor(Math.random() * special.length)];

    for (let i = 0; i < 12; i++) {
      pwd += all[Math.floor(Math.random() * all.length)];
    }

    setPassword(pwd.split('').sort(() => Math.random() - 0.5).join(''));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4 shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Password Strength Analyzer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Check password strength with detailed security analysis
          </p>
        </div>

        {/* Input */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Enter Password</h2>
          </div>
          <div className="p-6">
            <div className="relative mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type or generate a password..."
                className="w-full px-4 py-4 pr-24 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-mono"
              />
              <div className="absolute right-2 top-2 flex space-x-1">
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                {password && (
                  <button
                    onClick={copyToClipboard}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
            {copied && (
              <p className="text-green-600 dark:text-green-400 text-sm mb-2">✓ Copied to clipboard!</p>
            )}
            <button
              onClick={generatePassword}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Generate Strong Password
            </button>
          </div>
        </div>

        {/* Analysis */}
        {analysis && (
          <div className="space-y-6">
            {/* Strength Meter */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className={`bg-gradient-to-r ${analysis.color} px-6 py-4`}>
                <h2 className="text-lg font-semibold text-white">Password Strength: {analysis.strength}</h2>
              </div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-6">
                  <div
                    className={`h-full bg-gradient-to-r ${analysis.color} transition-all duration-500`}
                    style={{ width: `${analysis.percentage}%` }}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{password.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Characters</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">{analysis.entropy}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Entropy (bits)</div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    ⏱️ Estimated Crack Time: <span className="text-yellow-700 dark:text-yellow-400">{analysis.crackTime}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Requirements Checklist */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-4">
                <h2 className="text-lg font-semibold text-white">Security Checklist</h2>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {analysis.checks.map((check, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${check.passed ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'}`}>
                        {check.passed ? '✓' : '✗'}
                      </span>
                      <span className={check.passed ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
                        {check.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
