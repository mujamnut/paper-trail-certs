
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload, Palette } from 'lucide-react';

export type CertificateDesign = 'classic' | 'modern' | 'elegant' | 'corporate' | 'tech' | 'custom';

interface CertificateDesignsProps {
  selectedDesign: CertificateDesign;
  onDesignChange: (design: CertificateDesign) => void;
  customBackgroundUrl?: string;
  onCustomBackgroundUpload: (url: string) => void;
}

const designs = [
  {
    id: 'classic' as CertificateDesign,
    name: 'Design Klasik',
    description: 'Design tradisional dengan border elegant',
    preview: 'bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-900',
    icon: '🏛️'
  },
  {
    id: 'modern' as CertificateDesign,
    name: 'Design Modern',
    description: 'Clean modern design dengan tema hijau',
    preview: 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-900',
    icon: '✨'
  },
  {
    id: 'elegant' as CertificateDesign,
    name: 'Design Elegant',
    description: 'Sophisticated purple design',
    preview: 'bg-gradient-to-br from-purple-50 to-violet-100 border-purple-900',
    icon: '💎'
  },
  {
    id: 'corporate' as CertificateDesign,
    name: 'Design Corporate',
    description: 'Professional gray design untuk business',
    preview: 'bg-gradient-to-br from-gray-50 to-slate-100 border-gray-900',
    icon: '🏢'
  },
  {
    id: 'tech' as CertificateDesign,
    name: 'Design Tech',
    description: 'Futuristik untuk acara teknologi',
    preview: 'bg-gradient-to-br from-cyan-50 to-blue-100 border-cyan-900',
    icon: '💻'
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
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-purple-100 p-2 rounded-lg">
          <Palette className="h-6 w-6 text-purple-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">Pilih Design Sijil</h3>
      </div>
      
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
                className={`block cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                  selectedDesign === design.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="space-y-4">
                  <div className={`h-24 w-full rounded-xl border-4 ${design.preview} flex items-center justify-center shadow-sm`}>
                    <div className="text-center">
                      <div className="text-2xl mb-1">{design.icon}</div>
                      <div className="text-xs font-medium opacity-75">Certificate Preview</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-800 text-lg">{design.name}</div>
                    <div className="text-sm text-gray-600 mt-1">{design.description}</div>
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
              className={`block cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                selectedDesign === 'custom'
                  ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="space-y-4">
                <div 
                  className={`h-24 w-full rounded-xl border-4 border-dashed flex items-center justify-center transition-all duration-300 ${
                    isDragging ? 'border-blue-400 bg-blue-50 scale-105' : 'border-gray-300 bg-gray-50'
                  } ${customBackgroundUrl ? 'bg-cover bg-center' : ''}`}
                  style={customBackgroundUrl ? { backgroundImage: `url(${customBackgroundUrl})` } : {}}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  {!customBackgroundUrl ? (
                    <div className="text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <div className="text-xs font-medium text-gray-500">Upload Design Sendiri</div>
                      <div className="text-xs text-gray-400">🏠 Klik untuk upload</div>
                    </div>
                  ) : (
                    <div className="text-xs font-medium bg-black bg-opacity-50 text-white px-3 py-2 rounded-lg">
                      Custom Design ✨
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-800 text-lg">Custom Design</div>
                  <div className="text-sm text-gray-600 mt-1">Upload design template sendiri</div>
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
