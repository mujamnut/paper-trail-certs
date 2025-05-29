
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { CertificateData } from '@/pages/Index';
import { toast } from '@/hooks/use-toast';

interface CertificatePreviewProps {
  data: CertificateData;
}

const CertificatePreview: React.FC<CertificatePreviewProps> = ({ data }) => {
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
      // Simple download functionality using html2canvas would require adding the library
      // For now, we'll show a toast message
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

  return (
    <div className="space-y-4">
      {/* Certificate */}
      <div 
        ref={certificateRef}
        className="bg-gradient-to-br from-blue-50 to-indigo-100 border-8 border-blue-900 p-8 aspect-[4/3] flex flex-col justify-center items-center text-center relative overflow-hidden"
        style={{ minHeight: '400px' }}
      >
        {/* Decorative corner elements */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-gold-500"></div>
        <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-gold-500"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-gold-500"></div>
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-gold-500"></div>

        {/* Certificate Content */}
        <div className="space-y-6 max-w-md">
          <h1 className="text-4xl font-serif font-bold text-blue-900 mb-4">
            Certificate of Completion
          </h1>
          
          <div className="text-lg text-slate-700">
            <p className="mb-2">This is to certify that</p>
          </div>
          
          <div className="text-3xl font-serif font-bold text-blue-900 border-b-2 border-blue-300 pb-2 mb-4">
            {data.recipientName || 'Recipient Name'}
          </div>
          
          <div className="text-lg text-slate-700 space-y-2">
            <p>has successfully completed</p>
            <div className="text-xl font-semibold text-blue-800">
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
            <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gold-400 flex items-center justify-center">
                <div className="text-blue-900 font-bold text-xs">SEAL</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <Button 
        onClick={downloadCertificate}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        disabled={!data.recipientName || !data.courseName}
      >
        <Download className="w-4 h-4 mr-2" />
        Download Certificate
      </Button>
      
      {(!data.recipientName || !data.courseName) && (
        <p className="text-sm text-slate-500 text-center">
          Fill in the recipient name and course to enable download
        </p>
      )}
    </div>
  );
};

export default CertificatePreview;
