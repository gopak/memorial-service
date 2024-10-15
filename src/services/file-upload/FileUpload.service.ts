import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  /**
   * @description pushFileToStorage
   * @param storage
   * @param path
   * @param file
   * @return {Observable<UploadTaskSnapshot | undefined>}
   */
  pushFileToStorage(
    storage: AngularFireStorage,
    path: string,
    file: File
  ): Observable<UploadTaskSnapshot | undefined> {
    const uploadTask = storage.upload(path, file);
    return uploadTask.snapshotChanges();
  }

  /**
   * @description deleteFileStorage
   * @param storage
   * @param path
   * @return {Observable<any>}
   */
  deleteFileStorage(
    storage: AngularFireStorage,
    path: string
  ): Observable<any> {
    return storage.ref(path).delete();
  }
}
