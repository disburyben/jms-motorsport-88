import { projectId, publicAnonKey } from '../utils/supabase/info';

export function Admin() {
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
