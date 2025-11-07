import { useEffect, useState } from 'react';
import { projectId } from '../utils/supabase/info';

const LOCAL_STORAGE_KEY = 'jms-admin-export-token';

export function Admin() {
  const [adminToken, setAdminToken] = useState('');
  const [tokenInput, setTokenInput] = useState('');
  const [tokenMessage, setTokenMessage] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const savedToken = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedToken) {
      setAdminToken(savedToken);
      setTokenMessage('Admin token loaded from local storage.');
    }
  }, []);

  const persistToken = (token: string) => {
    if (typeof window === 'undefined') {
      return;
    }

    if (token) {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, token);
    } else {
      window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  const handleSaveToken = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = tokenInput.trim();

    if (!trimmed) {
      setTokenMessage('Please enter a token before saving.');
      return;
    }

    setAdminToken(trimmed);
    persistToken(trimmed);
    setTokenMessage('Admin token saved locally. You can now export data.');
    setTokenInput('');
  };

  const handleClearToken = () => {
    setAdminToken('');
    persistToken('');
    setTokenMessage('Admin token removed. Re-enter it to enable exports.');
  };

  const downloadExport = async (endpoint: string, filename: string, emptyMessage: string) => {
    if (!adminToken) {
      setTokenMessage('Enter the admin token to enable exports.');
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-e359eb76/${endpoint}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (response.status === 401) {
        setTokenMessage('The admin token is invalid or expired. Update it and try again.');
        return;
      }

      if (!response.ok) {
        if (response.status === 404) {
          alert(emptyMessage);
          return;
        }
        throw new Error(`Failed to export ${endpoint}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error(`Error exporting ${endpoint}:`, error);
      alert('Failed to export data. Check the console for details.');
    }
  };

  const handleExportContacts = () =>
    downloadExport('export/contacts', 'contact-submissions.csv', 'No contact submissions found');

  const handleExportSignups = () =>
    downloadExport('export/signups', 'email-signups.csv', 'No email signups found');

  return (
    <section className="bg-[#0a0a0a] text-white py-[100px] px-10 min-h-screen">
      <div className="max-w-[1200px] mx-auto">
        <h1
          className="text-center mb-[80px] tracking-[0.1em] uppercase relative pb-[30px]"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(2em, 5vw, 3.5em)',
          }}
        >
          Admin Dashboard
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[80px] h-[3px] bg-[#ff6600]" />
        </h1>

        <div className="max-w-[700px] mx-auto mb-[60px] bg-[rgba(255,255,255,0.02)] border border-[#1a1a1a] p-[30px]">
          <h2
            className="mb-[20px] tracking-[0.1em] uppercase"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '2em',
            }}
          >
            Admin Access Token
          </h2>
          <p className="opacity-70 mb-[25px] leading-relaxed">
            Enter the secure administrative token to enable CSV exports. The token is stored only in this browser and can
            be cleared at any time.
          </p>
          <form onSubmit={handleSaveToken} className="flex flex-col sm:flex-row gap-[15px]">
            <input
              type="password"
              value={tokenInput}
              onChange={(event) => setTokenInput(event.target.value)}
              placeholder="Enter admin token"
              className="flex-1 px-[25px] py-[18px] bg-[rgba(255,255,255,0.05)] border border-[#333] text-white text-[0.95em] tracking-[0.05em] outline-none transition-all duration-300 focus:border-[#ff6600]"
            />
            <button
              type="submit"
              className="px-[40px] py-[18px] bg-[#ff6600] text-white text-[0.85em] tracking-[0.15em] uppercase cursor-pointer transition-all duration-300 hover:bg-[#ff7700]"
            >
              Save Token
            </button>
          </form>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-[20px] gap-[10px] text-[0.85em] tracking-[0.05em] opacity-70">
            <span>{adminToken ? 'Token stored locally. Exports are enabled.' : 'No token saved. Exports are disabled.'}</span>
            {adminToken && (
              <button
                type="button"
                onClick={handleClearToken}
                className="text-[#ff6600] tracking-[0.1em] uppercase border border-[#ff6600]/40 px-[20px] py-[10px] hover:bg-[#ff6600]/10 transition-colors"
              >
                Clear Token
              </button>
            )}
          </div>
          {tokenMessage && (
            <p className="mt-[15px] text-[#ff6600] text-[0.85em] tracking-[0.05em]">
              {tokenMessage}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] max-w-[900px] mx-auto">
          {/* Contact Forms Export */}
          <div className="bg-[rgba(255,255,255,0.02)] border border-[#1a1a1a] p-[40px]">
            <h2
              className="mb-[20px] tracking-[0.1em] uppercase"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '2em',
              }}
            >
              Contact Forms
            </h2>
            <p className="opacity-70 mb-[30px] leading-relaxed">
              Export all contact form submissions as a CSV file. Includes name, email, and message.
            </p>
            <button
              onClick={handleExportContacts}
              disabled={!adminToken}
              className="bg-[#ff6600] text-white border-none px-[35px] py-[15px] text-[0.75em] tracking-[0.2em] cursor-pointer font-black transition-all duration-300 hover:bg-[#ff7700] hover:-translate-y-[2px] w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {adminToken ? 'EXPORT CONTACTS' : 'ENTER TOKEN TO EXPORT'}
            </button>
          </div>

          {/* Email Signups Export */}
          <div className="bg-[rgba(255,255,255,0.02)] border border-[#1a1a1a] p-[40px]">
            <h2
              className="mb-[20px] tracking-[0.1em] uppercase"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '2em',
              }}
            >
              Email Signups
            </h2>
            <p className="opacity-70 mb-[30px] leading-relaxed">
              Export all merchandise store email signups as a CSV file.
            </p>
            <button
              onClick={handleExportSignups}
              disabled={!adminToken}
              className="bg-[#ff6600] text-white border-none px-[35px] py-[15px] text-[0.75em] tracking-[0.2em] cursor-pointer font-black transition-all duration-300 hover:bg-[#ff7700] hover:-translate-y-[2px] w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {adminToken ? 'EXPORT SIGNUPS' : 'ENTER TOKEN TO EXPORT'}
            </button>
          </div>
        </div>

        <div className="mt-[60px] text-center opacity-60">
          <p className="text-[0.9em]">
            CSV files will download automatically when you click the export buttons.
          </p>
        </div>
      </div>
    </section>
  );
}
