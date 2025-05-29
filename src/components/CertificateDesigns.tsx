
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export type CertificateDesign = 'classic' | 'modern' | 'elegant' | 'corporate';

interface CertificateDesignsProps {
  selectedDesign: CertificateDesign;
  onDesignChange: (design: CertificateDesign) => void;
}

const designs = [
  {
    id: 'classic' as CertificateDesign,
    name: 'Classic Blue',
    description: 'Traditional blue design with golden accents',
    preview: 'bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-900'
  },
  {
    id: 'modern' as CertificateDesign,
    name: 'Modern Green',
    description: 'Clean modern design with green theme',
    preview: 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-900'
  },
  {
    id: 'elegant' as CertificateDesign,
    name: 'Elegant Purple',
    description: 'Sophisticated purple design',
    preview: 'bg-gradient-to-br from-purple-50 to-violet-100 border-purple-900'
  },
  {
    id: 'corporate' as CertificateDesign,
    name: 'Corporate Gray',
    description: 'Professional gray design for business',
    preview: 'bg-gradient-to-br from-gray-50 to-slate-100 border-gray-900'
  }
];

const CertificateDesigns: React.FC<CertificateDesignsProps> = ({ selectedDesign, onDesignChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-slate-800">Choose Certificate Design</h3>
      <RadioGroup value={selectedDesign} onValueChange={onDesignChange}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {designs.map((design) => (
            <div key={design.id} className="relative">
              <RadioGroupItem
                value={design.id}
                id={design.id}
                className="sr-only"
              />
              <Label
                htmlFor={design.id}
                className={`block cursor-pointer rounded-lg border-2 p-4 transition-all ${
                  selectedDesign === design.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="space-y-3">
                  <div className={`h-20 w-full rounded border-4 ${design.preview} flex items-center justify-center`}>
                    <div className="text-xs font-medium opacity-75">Certificate Preview</div>
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">{design.name}</div>
                    <div className="text-sm text-slate-600">{design.description}</div>
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default CertificateDesigns;
