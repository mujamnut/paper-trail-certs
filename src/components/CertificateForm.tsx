
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
      <div className="space-y-2">
        <Label htmlFor="recipientName" className="text-slate-700 font-medium">
          Recipient Name
        </Label>
        <Input
          id="recipientName"
          placeholder="Enter the recipient's full name"
          value={data.recipientName}
          onChange={(e) => handleChange('recipientName', e.target.value)}
          className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="courseName" className="text-slate-700 font-medium">
          Course/Achievement
        </Label>
        <Input
          id="courseName"
          placeholder="e.g., Advanced React Development"
          value={data.courseName}
          onChange={(e) => handleChange('courseName', e.target.value)}
          className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="completionDate" className="text-slate-700 font-medium">
          Completion Date
        </Label>
        <Input
          id="completionDate"
          type="date"
          value={data.completionDate}
          onChange={(e) => handleChange('completionDate', e.target.value)}
          className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="issuerName" className="text-slate-700 font-medium">
          Issuer Name
        </Label>
        <Input
          id="issuerName"
          placeholder="Organization or instructor name"
          value={data.issuerName}
          onChange={(e) => handleChange('issuerName', e.target.value)}
          className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="issuerTitle" className="text-slate-700 font-medium">
          Issuer Title
        </Label>
        <Input
          id="issuerTitle"
          placeholder="e.g., Director of Education"
          value={data.issuerTitle}
          onChange={(e) => handleChange('issuerTitle', e.target.value)}
          className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default CertificateForm;
