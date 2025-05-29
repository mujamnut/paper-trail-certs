
import React, { useState } from 'react';
import CertificateForm from '@/components/CertificateForm';
import CertificatePreview from '@/components/CertificatePreview';
import CertificateDesigns, { CertificateDesign } from '@/components/CertificateDesigns';
import ExcelUpload from '@/components/ExcelUpload';
import BatchCertificates from '@/components/BatchCertificates';

export interface CertificateData {
  recipientName: string;
  courseName: string;
  completionDate: string;
  issuerName: string;
  issuerTitle: string;
}

const Index = () => {
  const [certificateData, setCertificateData] = useState<CertificateData>({
    recipientName: '',
    courseName: '',
    completionDate: '',
    issuerName: '',
    issuerTitle: ''
  });

  const [batchNames, setBatchNames] = useState<string[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<CertificateDesign>('classic');
  const [customBackgroundUrl, setCustomBackgroundUrl] = useState<string>('');

  const handleNamesExtracted = (names: string[]) => {
    setBatchNames(names);
  };

  const clearBatch = () => {
    setBatchNames([]);
  };

  const handleCustomBackgroundUpload = (url: string) => {
    setCustomBackgroundUrl(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-slate-800">Certificate Generator</h1>
          <p className="text-slate-600 mt-2">Create professional certificates in minutes</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Certificate Details</h2>
              <CertificateForm 
                data={certificateData} 
                onChange={setCertificateData} 
              />
            </div>

            {/* Design Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <CertificateDesigns 
                selectedDesign={selectedDesign}
                onDesignChange={setSelectedDesign}
                customBackgroundUrl={customBackgroundUrl}
                onCustomBackgroundUpload={handleCustomBackgroundUpload}
              />
            </div>

            {/* Excel Upload Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Batch Generation</h2>
              <ExcelUpload onNamesExtracted={handleNamesExtracted} />
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Preview</h2>
            {batchNames.length > 0 ? (
              <BatchCertificates 
                names={batchNames}
                baseData={certificateData}
                design={selectedDesign}
                customBackgroundUrl={customBackgroundUrl}
                onClear={clearBatch}
              />
            ) : (
              <CertificatePreview 
                data={certificateData} 
                design={selectedDesign} 
                customBackgroundUrl={customBackgroundUrl}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
