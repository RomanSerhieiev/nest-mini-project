import { RequestToCreateBrandListResDto } from '#modules/requst-to-create/models/dto/res/request-to-create-brand-list.res.dto';
import { RequestToCreateModelListResDto } from '#modules/requst-to-create/models/dto/res/request-to-create-model-list.res.dto';

export class RequestToCreateListResDto {
  brands: RequestToCreateBrandListResDto;
  models: RequestToCreateModelListResDto;
}
