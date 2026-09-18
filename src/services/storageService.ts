import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase/storage';
import { uniqueFileName } from '../utils/fileValidation';

export interface UploadedFile {
  url: string;
  storagePath: string;
  name: string;
  contentType: string;
  size: number;
}

/**
 * All storage paths are built here so the hierarchy stays consistent:
 *   projects/{projectId}/thumbnail|gallery|videos/{file}
 *   projectRequests/{requestId}/attachments/{file}
 */
export const storagePaths = {
  projectThumbnail: (projectId: string, fileName: string) =>
    `projects/${projectId}/thumbnail/${uniqueFileName(fileName)}`,
  projectGallery: (projectId: string, fileName: string) =>
    `projects/${projectId}/gallery/${uniqueFileName(fileName)}`,
  projectVideo: (projectId: string, fileName: string) =>
    `projects/${projectId}/videos/${uniqueFileName(fileName)}`,
  requestAttachment: (requestId: string, fileName: string) =>
    `projectRequests/${requestId}/attachments/${uniqueFileName(fileName)}`,
};

async function upload(path: string, file: File): Promise<UploadedFile> {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file, { contentType: file.type });
  const url = await getDownloadURL(snapshot.ref);

  return {
    url,
    storagePath: snapshot.ref.fullPath,
    name: file.name,
    contentType: file.type,
    size: file.size,
  };
}

export const storageService = {
  uploadProjectThumbnail: (projectId: string, file: File) =>
    upload(storagePaths.projectThumbnail(projectId, file.name), file),

  uploadProjectGalleryImage: (projectId: string, file: File) =>
    upload(storagePaths.projectGallery(projectId, file.name), file),

  uploadProjectVideo: (projectId: string, file: File) =>
    upload(storagePaths.projectVideo(projectId, file.name), file),

  uploadRequestAttachment: (requestId: string, file: File) =>
    upload(storagePaths.requestAttachment(requestId, file.name), file),

  /** Uploads several attachments in parallel for one request. */
  uploadRequestAttachments: (requestId: string, files: File[]) =>
    Promise.all(files.map((file) => storageService.uploadRequestAttachment(requestId, file))),

  /** Deleting media is best-effort: a missing object should not fail the calling operation. */
  async deleteByPath(storagePath: string): Promise<void> {
    try {
      await deleteObject(ref(storage, storagePath));
    } catch (error) {
      if (import.meta.env.DEV) console.warn('Could not delete storage object', storagePath, error);
    }
  },
};
