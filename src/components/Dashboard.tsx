import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts@2.15.2';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import {
  Users,
  Mail,
  Calendar,
  TrendingUp,
  Download,
  Eye,
  Lock,
  Trophy,
  Flag,
  Gauge
} from 'lucide-react';

// Password for dashboard access - in production, this should be more secure
const ADMIN_PASSWORD = 'jms2025';

export function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  const handleExportContacts = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-e359eb76/export/contacts`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          alert('No contact submissions found');
          return;
        }
        throw new Error('Failed to export contacts');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'contact-submissions.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting contacts:', error);
      alert('Failed to export contacts. Check the console for details.');
    }
  };

  const handleExportSignups = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-e359eb76/export/signups`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          alert('No email signups found');
          return;
        }
        throw new Error('Failed to export signups');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'email-signups.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting signups:', error);
      alert('Failed to export signups. Check the console for details.');
    }
  };

  // Mock data for charts - in production, this would come from Supabase
  const performanceData = [
    { race: 'Dec 29', position: 3, points: 85 },
    { race: 'Jan 3', position: 2, points: 92 },
    { race: 'Jan 7', position: 1, points: 100 },
    { race: 'Jan 9', position: 4, points: 78 },
    { race: 'Jan 10', position: 2, points: 92 },
    { race: 'Jan 14', position: 1, points: 100 },
  ];

  const contactsData = [
    { month: 'Aug', contacts: 12, signups: 28 },
    { month: 'Sep', contacts: 19, signups: 34 },
    { month: 'Oct', contacts: 25, signups: 45 },
    { month: 'Nov', contacts: 31, signups: 52 },
    { month: 'Dec', contacts: 42, signups: 68 },
    { month: 'Jan', contacts: 38, signups: 61 },
  ];

  const stats = [
    {
      label: 'Total Contacts',
      value: '167',
      change: '+12%',
      icon: Users,
      color: '#ff6600'
    },
    {
      label: 'Email Signups',
      value: '288',
      change: '+18%',
      icon: Mail,
      color: '#ff6600'
    },
    {
      label: 'Upcoming Races',
      value: '11',
      change: '2025-26',
      icon: Calendar,
      color: '#ff6600'
    },
    {
      label: 'Season Points',
      value: '547',
      change: 'Rank #2',
      icon: Trophy,
      color: '#ff6600'
    },
  ];

  // Login Form
  if (!isAuthenticated) {
    return (
      <section className="bg-[#0a0a0a] text-white min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-[450px]">
          <div className="bg-[rgba(255,255,255,0.02)] border-2 border-[#1a1a1a] p-[50px] relative overflow-hidden">
            {/* Orange glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#ff6600] opacity-[0.05] blur-[100px] rounded-full" />

            <div className="relative z-10">
              <div className="flex items-center justify-center mb-[40px]">
                <Lock className="w-[60px] h-[60px] text-[#ff6600]" strokeWidth={1.5} />
              </div>

              <h1
                className="text-center mb-[15px] tracking-[0.1em] uppercase"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '2.5em',
                }}
              >
                Admin Dashboard
              </h1>

              <p className="text-center opacity-60 mb-[40px] text-[0.95em]">
                JMS Motorsport 88
              </p>

              <form onSubmit={handleLogin}>
                <div className="mb-[25px]">
                  <label className="block mb-[10px] text-[0.85em] tracking-[0.1em] uppercase opacity-70">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[#1a1a1a] text-white px-[20px] py-[15px] text-[0.95em] focus:outline-none focus:border-[#ff6600] transition-colors"
                    placeholder="Enter password"
                    autoFocus
                  />
                  {error && (
                    <p className="mt-[10px] text-[#ff3333] text-[0.85em]">
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#ff6600] text-white border-none px-[35px] py-[18px] text-[0.75em] tracking-[0.2em] cursor-pointer font-black transition-all duration-300 hover:bg-[#ff7700] hover:-translate-y-[2px] uppercase"
                >
                  Login
                </button>
              </form>

              <div className="mt-[30px] text-center">
                <a
                  href="/"
                  className="text-[#ff6600] text-[0.85em] tracking-[0.05em] hover:text-[#ff7700] transition-colors"
                >
                  ← Back to website
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Main Dashboard
  return (
    <section className="bg-[#0a0a0a] text-white min-h-screen py-[60px] px-4 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-[60px]">
          <div>
            <h1
              className="tracking-[0.1em] uppercase mb-[10px]"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2.5em, 5vw, 3.5em)',
              }}
            >
              Admin Dashboard
            </h1>
            <p className="text-[#999] text-[0.95em]">
              JMS Motorsport 88 • Season 2025-26
            </p>
          </div>
          <div className="mt-[20px] md:mt-0">
            <a
              href="/"
              className="inline-block text-[#ff6600] text-[0.9em] tracking-[0.05em] hover:text-[#ff7700] transition-colors"
            >
              ← Back to website
            </a>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[25px] mb-[40px]">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[rgba(255,255,255,0.02)] border border-[#1a1a1a] p-[30px] relative overflow-hidden group hover:border-[#ff6600] transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[#ff6600] opacity-[0.03] blur-[60px] rounded-full group-hover:opacity-[0.08] transition-opacity" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-[20px]">
                  <stat.icon className="w-[32px] h-[32px] text-[#ff6600]" strokeWidth={1.5} />
                  <span className="text-[0.8em] text-[#ff6600] tracking-[0.05em]">
                    {stat.change}
                  </span>
                </div>
                <h3
                  className="mb-[5px] tracking-[0.05em]"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '2.5em',
                  }}
                >
                  {stat.value}
                </h3>
                <p className="text-[#999] text-[0.85em] tracking-[0.05em] uppercase">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[25px] mb-[40px]">
          {/* Performance Chart */}
          <Card className="bg-[rgba(255,255,255,0.02)] border-[#1a1a1a]">
            <CardHeader>
              <div className="flex items-center gap-[15px]">
                <Gauge className="w-[24px] h-[24px] text-[#ff6600]" strokeWidth={1.5} />
                <div>
                  <CardTitle
                    className="tracking-[0.05em] uppercase"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '1.8em',
                    }}
                  >
                    Race Performance
                  </CardTitle>
                  <CardDescription className="text-[#999]">
                    Points earned per race
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  points: {
                    label: "Points",
                    color: "#ff6600",
                  },
                }}
                className="h-[300px] w-full"
              >
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                  <XAxis
                    dataKey="race"
                    stroke="#666"
                    style={{ fontSize: '0.85em' }}
                  />
                  <YAxis
                    stroke="#666"
                    style={{ fontSize: '0.85em' }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="points"
                    stroke="#ff6600"
                    strokeWidth={3}
                    dot={{ fill: '#ff6600', r: 6 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Engagement Chart */}
          <Card className="bg-[rgba(255,255,255,0.02)] border-[#1a1a1a]">
            <CardHeader>
              <div className="flex items-center gap-[15px]">
                <TrendingUp className="w-[24px] h-[24px] text-[#ff6600]" strokeWidth={1.5} />
                <div>
                  <CardTitle
                    className="tracking-[0.05em] uppercase"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '1.8em',
                    }}
                  >
                    Fan Engagement
                  </CardTitle>
                  <CardDescription className="text-[#999]">
                    Contacts & signups by month
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  contacts: {
                    label: "Contacts",
                    color: "#ff6600",
                  },
                  signups: {
                    label: "Signups",
                    color: "#ff9944",
                  },
                }}
                className="h-[300px] w-full"
              >
                <BarChart data={contactsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                  <XAxis
                    dataKey="month"
                    stroke="#666"
                    style={{ fontSize: '0.85em' }}
                  />
                  <YAxis
                    stroke="#666"
                    style={{ fontSize: '0.85em' }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="contacts" fill="#ff6600" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="signups" fill="#ff9944" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Data Export Section */}
        <div className="mb-[40px]">
          <h2
            className="mb-[25px] tracking-[0.1em] uppercase"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '2em',
            }}
          >
            Data Management
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px]">
            {/* Contact Forms Export */}
            <div className="bg-[rgba(255,255,255,0.02)] border border-[#1a1a1a] p-[35px] hover:border-[#ff6600] transition-all duration-300">
              <div className="flex items-start gap-[20px] mb-[25px]">
                <div className="p-[12px] bg-[rgba(255,102,0,0.1)] rounded">
                  <Users className="w-[28px] h-[28px] text-[#ff6600]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3
                    className="mb-[8px] tracking-[0.1em] uppercase"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '1.5em',
                    }}
                  >
                    Contact Forms
                  </h3>
                  <p className="text-[#999] text-[0.9em] leading-relaxed">
                    Export all contact form submissions as CSV. Includes name, email, and message.
                  </p>
                </div>
              </div>
              <button
                onClick={handleExportContacts}
                className="w-full bg-[#ff6600] text-white border-none px-[25px] py-[15px] text-[0.75em] tracking-[0.2em] cursor-pointer font-black transition-all duration-300 hover:bg-[#ff7700] hover:-translate-y-[2px] flex items-center justify-center gap-[10px]"
              >
                <Download className="w-[16px] h-[16px]" />
                EXPORT CONTACTS
              </button>
            </div>

            {/* Email Signups Export */}
            <div className="bg-[rgba(255,255,255,0.02)] border border-[#1a1a1a] p-[35px] hover:border-[#ff6600] transition-all duration-300">
              <div className="flex items-start gap-[20px] mb-[25px]">
                <div className="p-[12px] bg-[rgba(255,102,0,0.1)] rounded">
                  <Mail className="w-[28px] h-[28px] text-[#ff6600]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3
                    className="mb-[8px] tracking-[0.1em] uppercase"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '1.5em',
                    }}
                  >
                    Email Signups
                  </h3>
                  <p className="text-[#999] text-[0.9em] leading-relaxed">
                    Export all merchandise store email signups as CSV file.
                  </p>
                </div>
              </div>
              <button
                onClick={handleExportSignups}
                className="w-full bg-[#ff6600] text-white border-none px-[25px] py-[15px] text-[0.75em] tracking-[0.2em] cursor-pointer font-black transition-all duration-300 hover:bg-[#ff7700] hover:-translate-y-[2px] flex items-center justify-center gap-[10px]"
              >
                <Download className="w-[16px] h-[16px]" />
                EXPORT SIGNUPS
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-[rgba(255,255,255,0.02)] border border-[#1a1a1a] p-[35px]">
          <h2
            className="mb-[25px] tracking-[0.1em] uppercase"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '2em',
            }}
          >
            Season Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
            <div className="text-center">
              <Flag className="w-[36px] h-[36px] text-[#ff6600] mx-auto mb-[15px]" strokeWidth={1.5} />
              <h3
                className="mb-[5px] tracking-[0.05em]"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '2.2em',
                }}
              >
                6 / 11
              </h3>
              <p className="text-[#999] text-[0.9em] tracking-[0.05em] uppercase">
                Races Completed
              </p>
            </div>

            <div className="text-center">
              <Trophy className="w-[36px] h-[36px] text-[#ff6600] mx-auto mb-[15px]" strokeWidth={1.5} />
              <h3
                className="mb-[5px] tracking-[0.05em]"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '2.2em',
                }}
              >
                2
              </h3>
              <p className="text-[#999] text-[0.9em] tracking-[0.05em] uppercase">
                Race Wins
              </p>
            </div>

            <div className="text-center">
              <Eye className="w-[36px] h-[36px] text-[#ff6600] mx-auto mb-[15px]" strokeWidth={1.5} />
              <h3
                className="mb-[5px] tracking-[0.05em]"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '2.2em',
                }}
              >
                4.2K
              </h3>
              <p className="text-[#999] text-[0.9em] tracking-[0.05em] uppercase">
                Website Visits
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
