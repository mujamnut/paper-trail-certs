
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BarChart3, Upload, FileSpreadsheet, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';

interface ExcelUploadProps {
  onNamesExtracted: (names: string[]) => void;
}

const ExcelUpload: React.FC<ExcelUploadProps> = ({ onNamesExtracted }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
          file.type === 'application/vnd.ms-excel' ||
          file.name.endsWith('.xlsx') || 
          file.name.endsWith('.xls')) {
        setSelectedFile(file);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please select an Excel file (.xlsx or .xls)",
          variant: "destructive",
        });
      }
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
          file.type === 'application/vnd.ms-excel' ||
          file.name.endsWith('.xlsx') || 
          file.name.endsWith('.xls')) {
        setSelectedFile(file);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please select an Excel file (.xlsx or .xls)",
          variant: "destructive",
        });
      }
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processExcelFile = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    try {
      const data = await selectedFile.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const names: string[] = [];
      for (let i = 0; i < jsonData.length; i++) {
        const row = jsonData[i] as any[];
        if (row[0] && typeof row[0] === 'string' && row[0].trim()) {
          names.push(row[0].trim());
        }
      }

      if (names.length === 0) {
        toast({
          title: "No Names Found",
          description: "No valid names were found in the first column of the Excel file.",
          variant: "destructive",
        });
      } else {
        onNamesExtracted(names);
        toast({
          title: "Success",
          description: `Extracted ${names.length} names from the Excel file.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error Processing File",
        description: "There was an error reading the Excel file. Please check the file format.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-green-100 p-2 rounded-lg">
          <BarChart3 className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">Upload File Excel</h3>
      </div>
      
      <div className="border-2 border-dashed border-blue-300 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 transition-all duration-300 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-100 hover:to-indigo-100">
        {!selectedFile ? (
          <div 
            className={`text-center transition-all duration-300 ${isDragging ? 'scale-105' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FileSpreadsheet className="h-8 w-8 text-yellow-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">📂 Drag & Drop file Excel di sini</h4>
            <p className="text-gray-600 mb-2">atau klik untuk pilih file (.xlsx, .xls)</p>
            <p className="text-sm text-blue-600 font-medium mb-6">Format: Kolum A = Nama peserta</p>
            
            <Input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileSelect}
              className="hidden"
              id="excel-upload"
            />
            <label htmlFor="excel-upload">
              <Button 
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
                asChild
              >
                <span>Pilih File Excel</span>
              </Button>
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3">
                <FileSpreadsheet className="h-6 w-6 text-green-600" />
                <span className="font-medium text-gray-700">{selectedFile.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFile}
                className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <Button
              onClick={processExcelFile}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <Upload className="w-5 h-5 mr-2" />
              {isProcessing ? 'Processing...' : 'Extract Names'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExcelUpload;
