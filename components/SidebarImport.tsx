'use client';

import React, { ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { importNote } from '@/actions';

interface SidebarImportProps {
  lng: 'zh' | 'en';
}

export default function SidebarImport({ lng }: SidebarImportProps) {
  const router = useRouter();

  const onChange = async (e: ChangeEvent) => {
    const fileInput = e.target! as HTMLInputElement;

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn('files list is empty');
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', file);

    try {
      const data = await importNote(formData);
      router.push(`/${lng}/note/${data.uid}`);
    } catch (error) {
      console.error('something went wrong');
    }

    // 重置 file input
    (e.target as HTMLInputElement).type = 'text';
    (e.target as HTMLInputElement).type = 'file';
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <label htmlFor="file" style={{ cursor: 'pointer' }}>
        Import .md File
      </label>
      <input
        type="file"
        id="file"
        name="file"
        style={{ position: 'absolute', clip: 'rect(0 0 0 0)' }}
        onChange={onChange}
        accept=".md"
      />
    </div>
  );
}
