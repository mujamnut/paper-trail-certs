
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CertificateData } from '@/pages/Index';

interface CertificateFormProps {
  data: CertificateData;
  onChange: (data: CertificateData) => void;
}

const CertificateForm: React.FC<CertificateFormProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof CertificateData, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="courseName" className="text-gray-700 font-semibold text-lg">
          Tajuk Sijil:
        </Label>
        <Input
          id="courseName"
          placeholder="SIJIL PENGHARGAAN"
          value={data.courseName}
          onChange={(e) => handleChange('courseName', e.target.value)}
          className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl py-3 px-4 text-lg font-medium"
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="subtitle" className="text-gray-700 font-semibold text-lg">
          Subtitle:
        </Label>
        <Textarea
          id="subtitle"
          placeholder="Diberikan kepada"
          className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl py-3 px-4 resize-none"
          rows={2}
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="description" className="text-gray-700 font-semibold text-lg">
          Keterangan:
        </Label>
        <Textarea
          id="description"
          placeholder="Atas pencapaian cemerlang dalam program yang telah dijalankan"
          className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl py-3 px-4 resize-none"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="completionDate" className="text-gray-700 font-semibold text-lg">
            Tarikh:
          </Label>
          <Input
            id="completionDate"
            type="date"
            value={data.completionDate}
            onChange={(e) => handleChange('completionDate', e.target.value)}
            className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl py-3 px-4"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="recipientName" className="text-gray-700 font-semibold text-lg">
            Nama Peserta:
          </Label>
          <Input
            id="recipientName"
            placeholder="Nama peserta akan diisi otomatis dari Excel"
            value={data.recipientName}
            onChange={(e) => handleChange('recipientName', e.target.value)}
            className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl py-3 px-4"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="issuerName" className="text-gray-700 font-semibold text-lg">
            Nama Penandatangan:
          </Label>
          <Input
            id="issuerName"
            placeholder="Nama penandatangan"
            value={data.issuerName}
            onChange={(e) => handleChange('issuerName', e.target.value)}
            className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl py-3 px-4"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="issuerTitle" className="text-gray-700 font-semibold text-lg">
            Jawatan Penandatangan:
          </Label>
          <Input
            id="issuerTitle"
            placeholder="Jawatan penandatangan"
            value={data.issuerTitle}
            onChange={(e) => handleChange('issuerTitle', e.target.value)}
            className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl py-3 px-4"
          />
        </div>
      </div>
    </div>
  );
};

export default CertificateForm;
