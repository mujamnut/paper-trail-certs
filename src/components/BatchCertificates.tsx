
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { CertificateData } from '@/pages/Index';
import { CertificateDesign } from '@/components/CertificateDesigns';
import CertificatePreview from './CertificatePreview';

interface BatchCertificatesProps {
  names: string[];
  baseData: CertificateData;
  design: CertificateDesign;
  onClear: () => void;
}

const BatchCertificates: React.FC<BatchCertificatesProps> = ({ names, baseData, design, onClear }) => {
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-slate-800">
            Batch Certificates ({names.length} total)
          </h3>
        </div>
        <Button variant="outline" onClick={onClear}>
          Clear Batch
        </Button>
      </div>

      <div className="bg-slate-50 p-3 rounded border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-600">
            Certificate {currentIndex + 1} of {names.length}
          </span>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevCertificate}
              disabled={currentIndex === 0}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextCertificate}
              disabled={currentIndex === names.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
        <div className="text-lg font-medium text-slate-800">
          {names[currentIndex]}
        </div>
      </div>

      <CertificatePreview data={currentCertificateData} design={design} />
    </div>
  );
};

export default BatchCertificates;
