import { RequestToCreateModelResDto } from '#modules/requst-to-create/models/dto/res/request-to-create-model.res.dto';

export class RequestToCreateModelListResDto {
  requests: RequestToCreateModelResDto[];
  total: number;
}
