
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { CertificateData } from '@/pages/Index';
import { CertificateDesign } from '@/components/CertificateDesigns';
import CertificatePreview from './CertificatePreview';

interface BatchCertificatesProps {
  names: string[];
  baseData: CertificateData;
  design: CertificateDesign;
  customBackgroundUrl?: string;
  onClear: () => void;
}

const BatchCertificates: React.FC<BatchCertificatesProps> = ({ 
  names, 
  baseData, 
  design, 
  customBackgroundUrl,
  onClear 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentCertificateData: CertificateData = {
    ...baseData,
    recipientName: names[currentIndex] || '',
  };

  const nextCertificate = () => {
    if (currentIndex < names.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevCertificate = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <FileText className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">
            Batch Certificates ({names.length} total)
          </h3>
        </div>
        <Button 
          variant="outline" 
          onClick={onClear}
          className="border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl px-4 py-2 font-semibold"
        >
          Clear Batch
        </Button>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-gray-700">
            Certificate {currentIndex + 1} of {names.length}
          </span>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevCertificate}
              disabled={currentIndex === 0}
              className="rounded-xl px-4 py-2 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextCertificate}
              disabled={currentIndex === names.length - 1}
              className="rounded-xl px-4 py-2 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
        <div className="text-2xl font-bold text-blue-800 bg-white p-4 rounded-xl shadow-sm border border-blue-100">
          👤 {names[currentIndex]}
        </div>
      </div>

      <CertificatePreview 
        data={currentCertificateData} 
        design={design} 
        customBackgroundUrl={customBackgroundUrl}
      />
    </div>
  );
};

export default BatchCertificates;
