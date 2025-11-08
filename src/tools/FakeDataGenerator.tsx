import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, CreditCard, Building, Globe, Copy, Check } from 'lucide-react';

interface FakeData {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  birthDate: string;
  age: number;
  username: string;
  company: string;
  jobTitle: string;
  creditCard: string;
  ipAddress: string;
}

export default function FakeDataGenerator() {
  const [data, setData] = useState<FakeData | null>(null);
  const [copied, setCopied] = useState<string>('');

  const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'James', 'Emma', 'Robert', 'Olivia', 'William', 'Ava', 'Richard', 'Sophia', 'Thomas'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'Jackson'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'Austin', 'London', 'Paris', 'Tokyo', 'Berlin', 'Sydney'];
  const countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Spain', 'Italy', 'Japan', 'Brazil'];
  const companies = ['Tech Corp', 'Data Solutions', 'Innovation Labs', 'Global Systems', 'Digital Dynamics', 'Future Tech', 'Smart Solutions', 'Cloud Services', 'Web Innovations', 'Cyber Systems'];
  const jobTitles = ['Software Engineer', 'Product Manager', 'Data Analyst', 'UX Designer', 'Marketing Manager', 'Sales Director', 'HR Specialist', 'Financial Analyst', 'Project Manager', 'Business Consultant'];

  const randomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const randomNumber = (min: number, max: number): number => 
    Math.floor(Math.random() * (max - min + 1)) + min;

  const generateCreditCard = (): string => {
    const parts = [];
    for (let i = 0; i < 4; i++) {
      parts.push(String(randomNumber(1000, 9999)));
    }
    return parts.join(' ');
  };

  const generateIP = (): string => {
    return `${randomNumber(1, 255)}.${randomNumber(0, 255)}.${randomNumber(0, 255)}.${randomNumber(0, 255)}`;
  };

  const generateBirthDate = (): { date: string; age: number } => {
    const year = randomNumber(1950, 2005);
    const month = randomNumber(1, 12);
    const day = randomNumber(1, 28);
    const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const age = new Date().getFullYear() - year;
    return { date, age };
  };

  const generateData = () => {
    const firstName = randomElement(firstNames);
    const lastName = randomElement(lastNames);
    const city = randomElement(cities);
    const country = randomElement(countries);
    const { date: birthDate, age } = generateBirthDate();

    const newData: FakeData = {
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNumber(1, 999)}@example.com`,
      phone: `+1 (${randomNumber(200, 999)}) ${randomNumber(100, 999)}-${randomNumber(1000, 9999)}`,
      address: `${randomNumber(100, 9999)} ${randomElement(['Main', 'Oak', 'Maple', 'Pine', 'Cedar'])} ${randomElement(['Street', 'Avenue', 'Road', 'Boulevard', 'Lane'])}`,
      city,
      country,
      zipCode: String(randomNumber(10000, 99999)),
      birthDate,
      age,
      username: `${firstName.toLowerCase()}${lastName.toLowerCase()}${randomNumber(10, 999)}`,
      company: randomElement(companies),
      jobTitle: randomElement(jobTitles),
      creditCard: generateCreditCard(),
      ipAddress: generateIP()
    };

    setData(newData);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(''), 2000);
  };

  const copyAllData = () => {
    if (!data) return;
    
    const allDataText = `
Full Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
Address: ${data.address}
City: ${data.city}
Country: ${data.country}
ZIP Code: ${data.zipCode}
Birth Date: ${data.birthDate}
Age: ${data.age}
Username: ${data.username}
Company: ${data.company}
Job Title: ${data.jobTitle}
Credit Card: ${data.creditCard}
IP Address: ${data.ipAddress}
    `.trim();

    copyToClipboard(allDataText, 'all');
  };

  const DataField = ({ icon: Icon, label, value, field }: { icon: any; label: string; value: string; field: string }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{value}</p>
        </div>
      </div>
      <button
        onClick={() => copyToClipboard(value, field)}
        className="ml-3 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex-shrink-0"
        title="Copy to clipboard"
      >
        {copied === field ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Fake Data Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Generate realistic fake personal data for testing, development, and placeholder purposes.
          </p>
        </div>

        {/* Generate Button */}
        <div className="mb-8">
          <button
            onClick={generateData}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            Generate Fake Data
          </button>
        </div>

        {/* Data Display */}
        {data && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Generated Data</h2>
              <button
                onClick={copyAllData}
                className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all text-sm font-medium"
              >
                {copied === 'all' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied === 'all' ? 'Copied!' : 'Copy All'}</span>
              </button>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <DataField icon={User} label="Full Name" value={data.fullName} field="fullName" />
                <DataField icon={User} label="Username" value={data.username} field="username" />
                <DataField icon={Mail} label="Email" value={data.email} field="email" />
                <DataField icon={Phone} label="Phone" value={data.phone} field="phone" />
                <DataField icon={MapPin} label="Address" value={data.address} field="address" />
                <DataField icon={MapPin} label="City" value={data.city} field="city" />
                <DataField icon={Globe} label="Country" value={data.country} field="country" />
                <DataField icon={MapPin} label="ZIP Code" value={data.zipCode} field="zipCode" />
                <DataField icon={Calendar} label="Birth Date" value={data.birthDate} field="birthDate" />
                <DataField icon={Calendar} label="Age" value={String(data.age)} field="age" />
                <DataField icon={Building} label="Company" value={data.company} field="company" />
                <DataField icon={Building} label="Job Title" value={data.jobTitle} field="jobTitle" />
                <DataField icon={CreditCard} label="Credit Card" value={data.creditCard} field="creditCard" />
                <DataField icon={Globe} label="IP Address" value={data.ipAddress} field="ipAddress" />
              </div>
            </div>
          </div>
        )}

        {/* Info Sections */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Use Cases
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>• Testing forms and user interfaces</li>
              <li>• Creating mock databases</li>
              <li>• Demonstrating software features</li>
              <li>• Privacy-safe development testing</li>
              <li>• Database seeding for development</li>
              <li>• UI/UX design mockups</li>
            </ul>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              ⚠️ Important Notice
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>• This data is randomly generated and fictional</li>
              <li>• Do NOT use for fraudulent purposes</li>
              <li>• Credit card numbers are fake (not valid)</li>
              <li>• For testing and development only</li>
              <li>• Email addresses use example.com domain</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
