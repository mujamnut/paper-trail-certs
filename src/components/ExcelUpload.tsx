
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileSpreadsheet, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';

interface ExcelUploadProps {
  onNamesExtracted: (names: string[]) => void;
}

const ExcelUpload: React.FC<ExcelUploadProps> = ({ onNamesExtracted }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const processExcelFile = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    try {
      const data = await selectedFile.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Extract names from the first column, skip empty cells
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
    <div className="space-y-4 p-4 border-2 border-dashed border-slate-300 rounded-lg">
      <div className="text-center">
        <FileSpreadsheet className="mx-auto h-12 w-12 text-slate-400 mb-2" />
        <Label className="text-slate-700 font-medium">Upload Excel File</Label>
        <p className="text-sm text-slate-500 mt-1">
          Upload an Excel file with names in the first column
        </p>
      </div>

      {!selectedFile ? (
        <div>
          <Input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileSelect}
            className="cursor-pointer"
          />
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-2 bg-slate-50 rounded border">
            <span className="text-sm text-slate-700">{selectedFile.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFile}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <Button
            onClick={processExcelFile}
            disabled={isProcessing}
            className="w-full"
          >
            <Upload className="w-4 h-4 mr-2" />
            {isProcessing ? 'Processing...' : 'Extract Names'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExcelUpload;
