import { uploadFiles } from 'lib/api/uploads/uploads.api';
import { EResponse } from 'lib/enum/response';
import { IUploadResponse } from 'types/uploads.types';

// react-markdown-editor-lite 이미지 업로드 로직
const imageUpload = async (files: File): Promise<string> => {
  let selectFile: string = '';

  const formData: FormData = new FormData();
  formData.append('images', files);
  
  await uploadFiles(formData)
  .then(({ status, data: { files } }: IUploadResponse) => {
    if (status === EResponse.OK) {
      selectFile = files[0];
    }
  });

  return selectFile;
};

export default imageUpload;