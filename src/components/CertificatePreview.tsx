
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, FileDown } from 'lucide-react';
import { CertificateData } from '@/pages/Index';
import { CertificateDesign } from '@/components/CertificateDesigns';
import { toast } from '@/hooks/use-toast';

interface CertificatePreviewProps {
  data: CertificateData;
  design: CertificateDesign;
  customBackgroundUrl?: string;
}

const CertificatePreview: React.FC<CertificatePreviewProps> = ({ data, design, customBackgroundUrl }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    try {
      toast({
        title: "Download Feature",
        description: "Certificate download functionality would be implemented with html2canvas library.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error downloading the certificate.",
        variant: "destructive",
      });
    }
  };

  const getDesignClasses = () => {
    if (design === 'custom') {
      return {
        background: customBackgroundUrl ? '' : 'bg-gradient-to-br from-gray-50 to-slate-100',
        border: 'border-gray-900',
        title: 'text-gray-900',
        name: 'text-gray-900 border-gray-400',
        course: 'text-gray-800',
        seal: 'bg-gray-900'
      };
    }

    switch (design) {
      case 'classic':
        return {
          background: 'bg-gradient-to-br from-blue-50 to-indigo-100',
          border: 'border-blue-900',
          title: 'text-blue-900',
          name: 'text-blue-900 border-blue-300',
          course: 'text-blue-800',
          seal: 'bg-blue-900'
        };
      case 'modern':
        return {
          background: 'bg-gradient-to-br from-green-50 to-emerald-100',
          border: 'border-green-900',
          title: 'text-green-900',
          name: 'text-green-900 border-green-300',
          course: 'text-green-800',
          seal: 'bg-green-900'
        };
      case 'elegant':
        return {
          background: 'bg-gradient-to-br from-purple-50 to-violet-100',
          border: 'border-purple-900',
          title: 'text-purple-900',
          name: 'text-purple-900 border-purple-300',
          course: 'text-purple-800',
          seal: 'bg-purple-900'
        };
      case 'corporate':
        return {
          background: 'bg-gradient-to-br from-gray-50 to-slate-100',
          border: 'border-gray-900',
          title: 'text-gray-900',
          name: 'text-gray-900 border-gray-400',
          course: 'text-gray-800',
          seal: 'bg-gray-900'
        };
      case 'tech':
        return {
          background: 'bg-gradient-to-br from-cyan-50 to-blue-100',
          border: 'border-cyan-900',
          title: 'text-cyan-900',
          name: 'text-cyan-900 border-cyan-300',
          course: 'text-cyan-800',
          seal: 'bg-cyan-900'
        };
      default:
        return {
          background: 'bg-gradient-to-br from-blue-50 to-indigo-100',
          border: 'border-blue-900',
          title: 'text-blue-900',
          name: 'text-blue-900 border-blue-300',
          course: 'text-blue-800',
          seal: 'bg-blue-900'
        };
    }
  };

  const designClasses = getDesignClasses();

  const certificateStyle = design === 'custom' && customBackgroundUrl 
    ? { 
        backgroundImage: `url(${customBackgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : {};

  return (
    <div className="space-y-6">
      {/* Certificate Preview */}
      <div 
        ref={certificateRef}
        className={`${designClasses.background} border-8 ${designClasses.border} p-8 aspect-[4/3] flex flex-col justify-center items-center text-center relative overflow-hidden rounded-2xl shadow-2xl`}
        style={{ minHeight: '400px', ...certificateStyle }}
      >
        {/* Decorative corner elements */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-gold-500"></div>
        <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-gold-500"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-gold-500"></div>
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-gold-500"></div>

        {/* Certificate Content */}
        <div className={`space-y-6 max-w-md ${design === 'custom' ? 'bg-white bg-opacity-90 p-6 rounded-lg shadow-lg' : ''}`}>
          <h1 className={`text-4xl font-serif font-bold ${designClasses.title} mb-4`}>
            Certificate of Completion
          </h1>
          
          <div className="text-lg text-slate-700">
            <p className="mb-2">This is to certify that</p>
          </div>
          
          <div className={`text-3xl font-serif font-bold ${designClasses.name} border-b-2 pb-2 mb-4`}>
            {data.recipientName || 'Recipient Name'}
          </div>
          
          <div className="text-lg text-slate-700 space-y-2">
            <p>has successfully completed</p>
            <div className={`text-xl font-semibold ${designClasses.course}`}>
              {data.courseName || 'Course/Achievement Name'}
            </div>
          </div>
          
          <div className="text-sm text-slate-600 mt-6">
            <p>Completed on {formatDate(data.completionDate) || 'Date'}</p>
          </div>
          
          <div className="flex justify-between items-end mt-8 pt-4">
            <div className="text-center">
              <div className="border-t border-slate-400 pt-1 text-sm">
                <div className="font-semibold">{data.issuerName || 'Issuer Name'}</div>
                <div className="text-xs text-slate-600">{data.issuerTitle || 'Title'}</div>
              </div>
            </div>
            <div className={`w-16 h-16 rounded-full ${designClasses.seal} flex items-center justify-center`}>
              <div className="w-12 h-12 rounded-full bg-gold-400 flex items-center justify-center">
                <div className="text-white font-bold text-xs">SEAL</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <Button 
          className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          🔄 Update Preview
        </Button>

        <Button 
          className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          <FileDown className="w-5 h-5 mr-2" />
          📋 Generate Semua Sijil (PDF)
        </Button>

        <Button 
          onClick={downloadCertificate}
          disabled={!data.recipientName || !data.courseName}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-5 h-5 mr-2" />
          🖼️ Download Preview (PNG)
        </Button>
      </div>
      
      {(!data.recipientName || !data.courseName) && (
        <p className="text-sm text-gray-500 text-center bg-yellow-50 p-3 rounded-lg border border-yellow-200">
          💡 Isi nama peserta dan tajuk sijil untuk enable download
        </p>
      )}
    </div>
  );
};

export default CertificatePreview;
