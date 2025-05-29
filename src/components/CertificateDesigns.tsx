
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

export type CertificateDesign = 'classic' | 'modern' | 'elegant' | 'corporate' | 'custom';

interface CertificateDesignsProps {
  selectedDesign: CertificateDesign;
  onDesignChange: (design: CertificateDesign) => void;
  customBackgroundUrl?: string;
  onCustomBackgroundUpload: (url: string) => void;
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

const CertificateDesigns: React.FC<CertificateDesignsProps> = ({ 
  selectedDesign, 
  onDesignChange, 
  customBackgroundUrl,
  onCustomBackgroundUpload 
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      onCustomBackgroundUpload(url);
      onDesignChange('custom');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

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
          
          {/* Custom Design Upload Option */}
          <div className="relative">
            <RadioGroupItem
              value="custom"
              id="custom"
              className="sr-only"
            />
            <Label
              htmlFor="custom"
              className={`block cursor-pointer rounded-lg border-2 p-4 transition-all ${
                selectedDesign === 'custom'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="space-y-3">
                <div 
                  className={`h-20 w-full rounded border-4 border-dashed flex items-center justify-center transition-colors ${
                    isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
                  } ${customBackgroundUrl ? 'bg-cover bg-center' : 'bg-gray-50'}`}
                  style={customBackgroundUrl ? { backgroundImage: `url(${customBackgroundUrl})` } : {}}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  {!customBackgroundUrl && (
                    <div className="text-center">
                      <Upload className="h-6 w-6 mx-auto text-gray-400 mb-1" />
                      <div className="text-xs font-medium text-gray-500">Upload Image</div>
                    </div>
                  )}
                  {customBackgroundUrl && (
                    <div className="text-xs font-medium bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                      Custom Design
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-medium text-slate-800">Custom Design</div>
                  <div className="text-sm text-slate-600">Upload your own background image</div>
                </div>
              </div>
            </Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default CertificateDesigns;
