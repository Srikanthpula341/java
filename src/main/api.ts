import { useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";

export interface EligibilityFile {
  id: number;
  fileName: string;
  totalRecords: number;
  associationExist: string;
  associationCreated: string;
  planCreated: string;
  errors: number;
  errorDetails: string[];
  uploadDate: string;
  uploadedBy: string;
  status: string;
}

const FILE_LIST_URL = "/api/eligibility/files";

export const useFetchEligibilityFiles = () => {
  const axios = useAxios();
  const [files, setFiles] = useState<EligibilityFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchList = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get<EligibilityFile[]>(FILE_LIST_URL);
      setFiles(response.data);
    } catch {
      setError("Failed to fetch files");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return { files, loading, error, refresh: fetchList };
};
import { useState } from "react";
import { useAxios } from "../hooks/useAxios";

const FILE_UPLOAD_URL = "/api/eligibility/upload";

export const useUploadEligibilityFile = () => {
  const axios = useAxios();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (key: string, file: File): Promise<boolean> => {
    const formData = new FormData();
    formData.append(key, file);

    try {
      setUploading(true);
      setError(null);

      await axios.post(FILE_UPLOAD_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return true;
    } catch {
      setError("Upload failed");
      return false;
    } finally {
      setUploading(false);
    }
  };

  return { upload, uploading, error };
};
