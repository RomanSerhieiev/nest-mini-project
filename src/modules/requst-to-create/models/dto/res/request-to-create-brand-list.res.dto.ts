import { RequestToCreateBrandResDto } from './request-to-create-brand.res.dto';

export class RequestToCreateBrandListResDto {
  requests: RequestToCreateBrandResDto[];
  total: number;
}
