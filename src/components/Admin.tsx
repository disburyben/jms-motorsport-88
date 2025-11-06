import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface VisitStats {
  totalVisits: number;
  todayVisits: number;
  thisWeekVisits: number;
  thisMonthVisits: number;
  pageViews: Record<string, number>;
  topReferrers: Record<string, number>;
}

export function Admin() {
  const [visitStats, setVisitStats] = useState<VisitStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    const fetchVisitStats = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-e359eb76/stats/visits`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        );

        if (response.ok) {
          const stats = await response.json();
          setVisitStats(stats);
        }
      } catch (error) {
        console.error('Error fetching visit stats:', error);
      } finally {
        setIsLoadingStats(false);
      }
    };

    fetchVisitStats();
  }, []);

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

  const handleExportVisits = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-e359eb76/export/visits`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          alert('No site visits found');
          return;
        }
        throw new Error('Failed to export visits');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'site-visits.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting visits:', error);
      alert('Failed to export visits. Check the console for details.');
    }
  };

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

        {/* Site Visit Statistics */}
        <div className="mb-[60px]">
          <h2
            className="mb-[40px] tracking-[0.1em] uppercase"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '2.5em',
            }}
          >
            Site Visit Statistics
          </h2>

          {isLoadingStats ? (
            <div className="text-center opacity-70">Loading statistics...</div>
          ) : visitStats ? (
            <>
              {/* Visit Counters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-[20px] mb-[40px]">
                <div className="bg-[rgba(255,255,255,0.02)] border border-[#1a1a1a] p-[30px] text-center">
                  <div className="text-[3em] font-black text-[#ff6600] mb-[10px]">
                    {visitStats.totalVisits}
                  </div>
                  <div className="text-[0.9em] opacity-70 uppercase tracking-[0.1em]">
                    Total Visits
                  </div>
                </div>
                <div className="bg-[rgba(255,255,255,0.02)] border border-[#1a1a1a] p-[30px] text-center">
                  <div className="text-[3em] font-black text-[#ff6600] mb-[10px]">
                    {visitStats.todayVisits}
                  </div>
                  <div className="text-[0.9em] opacity-70 uppercase tracking-[0.1em]">
                    Today
                  </div>
                </div>
                <div className="bg-[rgba(255,255,255,0.02)] border border-[#1a1a1a] p-[30px] text-center">
                  <div className="text-[3em] font-black text-[#ff6600] mb-[10px]">
                    {visitStats.thisWeekVisits}
                  </div>
                  <div className="text-[0.9em] opacity-70 uppercase tracking-[0.1em]">
                    This Week
                  </div>
                </div>
                <div className="bg-[rgba(255,255,255,0.02)] border border-[#1a1a1a] p-[30px] text-center">
                  <div className="text-[3em] font-black text-[#ff6600] mb-[10px]">
                    {visitStats.thisMonthVisits}
                  </div>
                  <div className="text-[0.9em] opacity-70 uppercase tracking-[0.1em]">
                    This Month
                  </div>
                </div>
              </div>

              {/* Page Views and Referrers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] mb-[40px]">
                {/* Top Pages */}
                <div className="bg-[rgba(255,255,255,0.02)] border border-[#1a1a1a] p-[30px]">
                  <h3
                    className="mb-[20px] tracking-[0.1em] uppercase"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '1.5em',
                    }}
                  >
                    Page Views
                  </h3>
                  {Object.keys(visitStats.pageViews).length > 0 ? (
                    <div className="space-y-[15px]">
                      {Object.entries(visitStats.pageViews)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 5)
                        .map(([page, count]) => (
                          <div key={page} className="flex justify-between items-center">
                            <span className="opacity-70 truncate flex-1">{page}</span>
                            <span className="text-[#ff6600] font-bold ml-[20px]">{count}</span>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="opacity-70 text-center py-[20px]">No page views yet</div>
                  )}
                </div>

                {/* Top Referrers */}
                <div className="bg-[rgba(255,255,255,0.02)] border border-[#1a1a1a] p-[30px]">
                  <h3
                    className="mb-[20px] tracking-[0.1em] uppercase"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '1.5em',
                    }}
                  >
                    Top Referrers
                  </h3>
                  {Object.keys(visitStats.topReferrers).length > 0 ? (
                    <div className="space-y-[15px]">
                      {Object.entries(visitStats.topReferrers).map(([referrer, count]) => (
                        <div key={referrer} className="flex justify-between items-center">
                          <span className="opacity-70 truncate flex-1">
                            {referrer === 'direct' ? 'Direct Traffic' : referrer}
                          </span>
                          <span className="text-[#ff6600] font-bold ml-[20px]">{count}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="opacity-70 text-center py-[20px]">No referrers yet</div>
                  )}
                </div>
              </div>

              {/* Export Button */}
              <div className="max-w-[400px] mx-auto">
                <button
                  onClick={handleExportVisits}
                  className="bg-[#ff6600] text-white border-none px-[35px] py-[15px] text-[0.75em] tracking-[0.2em] cursor-pointer font-black transition-all duration-300 hover:bg-[#ff7700] hover:-translate-y-[2px] w-full"
                >
                  EXPORT ALL VISITS
                </button>
              </div>
            </>
          ) : (
            <div className="text-center opacity-70">Failed to load statistics</div>
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
              className="bg-[#ff6600] text-white border-none px-[35px] py-[15px] text-[0.75em] tracking-[0.2em] cursor-pointer font-black transition-all duration-300 hover:bg-[#ff7700] hover:-translate-y-[2px] w-full"
            >
              EXPORT CONTACTS
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
              className="bg-[#ff6600] text-white border-none px-[35px] py-[15px] text-[0.75em] tracking-[0.2em] cursor-pointer font-black transition-all duration-300 hover:bg-[#ff7700] hover:-translate-y-[2px] w-full"
            >
              EXPORT SIGNUPS
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
