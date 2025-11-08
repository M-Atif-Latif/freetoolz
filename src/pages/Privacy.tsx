export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 prose max-w-none">
        <p className="text-gray-600 mb-6 font-medium">Last updated: November 6, 2025</p>
        
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 rounded">
          <p className="text-blue-900 font-semibold">Your Privacy is Our Priority</p>
          <p className="text-blue-800 text-sm mt-1">FreeToolz is committed to protecting your privacy and ensuring your data security.</p>
        </div>

        <h2 className="text-2xl font-bold mb-3 text-gray-800">🔒 Your Privacy Matters</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          At FreeToolz, we take your privacy seriously. All our tools are designed with privacy-first principles. 
          Your data is processed entirely in your browser and never leaves your device. We do not have servers 
          that store, collect, or transmit your personal information.
        </p>

        <h2 className="text-2xl font-bold mb-3 mt-8 text-gray-800">📊 Information We Collect</h2>
        <p className="mb-3 text-gray-700 leading-relaxed">
          We collect minimal anonymous usage statistics to improve our services:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2 ml-4">
          <li>Anonymous page views and tool usage metrics</li>
          <li>Browser type and operating system (for compatibility improvements)</li>
          <li>General geographic location (country level only)</li>
          <li>Error reports to fix bugs and improve performance</li>
        </ul>
        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>We DO NOT collect:</strong> Personal information, IP addresses, email addresses, 
          uploaded files, processed data, or any identifiable information.
        </p>

        <h2 className="text-2xl font-bold mb-3 mt-8 text-gray-800">⚙️ How We Process Data</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          All data processing happens locally in your web browser using client-side JavaScript. When you use 
          our tools (text converters, calculators, PDF tools, image processors, etc.), all operations are 
          performed on your device. Your files and data never touch our servers.
        </p>

        <h2 className="text-2xl font-bold mb-3 mt-8 text-gray-800">🍪 Cookies and Local Storage</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          We may use browser local storage to save your preferences (such as theme settings or tool configurations) 
          locally on your device. This data remains on your device and is never transmitted to our servers. 
          You can clear this data anytime through your browser settings.
        </p>

        <h2 className="text-2xl font-bold mb-3 mt-8 text-gray-800">🔗 Third-Party Services</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          We may use third-party analytics services (like Google Analytics) to understand how our website is used. 
          These services may collect anonymous usage data. We do not share any personal information with third parties.
        </p>

        <h2 className="text-2xl font-bold mb-3 mt-8 text-gray-800">🛡️ Data Security</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          Since all processing happens in your browser, your data security depends on your device and browser security. 
          We recommend keeping your browser updated and using secure internet connections. We implement industry-standard 
          security practices for our website infrastructure.
        </p>

        <h2 className="text-2xl font-bold mb-3 mt-8 text-gray-800">👶 Children's Privacy</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          Our services are available to users of all ages. We do not knowingly collect any personal information 
          from anyone, including children under 13.
        </p>

        <h2 className="text-2xl font-bold mb-3 mt-8 text-gray-800">🔄 Changes to This Policy</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          We may update this privacy policy from time to time. Any changes will be posted on this page with 
          an updated revision date. We encourage you to review this policy periodically.
        </p>

        <h2 className="text-2xl font-bold mb-3 mt-8 text-gray-800">📞 Contact Us</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          If you have any questions about this Privacy Policy, please contact us at:{' '}
          <a href="mailto:muhammadatiflatif67@gmail.com" className="text-blue-600 hover:text-blue-700 underline">
            muhammadatiflatif67@gmail.com
          </a>
        </p>

        <div className="bg-gray-50 border border-gray-200 p-4 mt-8 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            By using FreeToolz, you acknowledge that you have read and understood this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
