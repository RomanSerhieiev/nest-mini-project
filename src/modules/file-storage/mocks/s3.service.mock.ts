import { MockType } from '#common/types/mock.type';

import { S3Service } from '../services/s3.service';

export const s3ServiceMock: MockType<S3Service> = {
  uploadFile: jest.fn(),
  deleteFile: jest.fn(),
};
