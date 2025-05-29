
import React, { useState } from 'react';
import CertificateForm from '@/components/CertificateForm';
import CertificatePreview from '@/components/CertificatePreview';
import CertificateDesigns, { CertificateDesign } from '@/components/CertificateDesigns';
import ExcelUpload from '@/components/ExcelUpload';
import BatchCertificates from '@/components/BatchCertificates';
import { Trophy } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-500 to-blue-600">
      {/* Beautiful Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center space-x-4">
            <Trophy className="h-12 w-12 text-yellow-300" />
            <div className="text-center">
              <h1 className="text-4xl font-bold">Generator Sijil Malaysia</h1>
              <p className="text-blue-100 mt-2 text-lg">Buat sijil profesional dengan mudah - Upload Excel & Download PDF</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            {/* Excel Upload Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <ExcelUpload onNamesExtracted={handleNamesExtracted} />
            </div>

            {/* Design Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <CertificateDesigns 
                selectedDesign={selectedDesign}
                onDesignChange={setSelectedDesign}
                customBackgroundUrl={customBackgroundUrl}
                onCustomBackgroundUpload={handleCustomBackgroundUpload}
              />
            </div>

            {/* Certificate Settings */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Trophy className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Tetapan Sijil</h2>
              </div>
              <CertificateForm 
                data={certificateData} 
                onChange={setCertificateData} 
              />
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Trophy className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Preview & Generate</h2>
            </div>
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
