import { RequestToCreateBrandEntity } from '#entities/request-to-create-brand.entity';
import { RequestToCreateModelEntity } from '#entities/request-to-create-model.entity';
import { BrandMapper } from '#modules/brand/presenters/brand.mapper';
import { ModelMapper } from '#modules/model/presenters/model.mapper';
import { RequestToCreateBrandResDto } from '#modules/requst-to-create/models/dto/res/request-to-create-brand.res.dto';
import { RequestToCreateBrandListResDto } from '#modules/requst-to-create/models/dto/res/request-to-create-brand-list.res.dto';
import { RequestToCreateModelResDto } from '#modules/requst-to-create/models/dto/res/request-to-create-model.res.dto';
import { RequestToCreateModelListResDto } from '#modules/requst-to-create/models/dto/res/request-to-create-model-list.res.dto';
import { UserMapper } from '#modules/users/presenters/user.mapper';

export class RequestToCreateMapper {
  public static toBrandResDto(request: RequestToCreateBrandEntity): RequestToCreateBrandResDto {
    return {
      _id: request._id,
      name: request.name,
      status: request.status,
      brand: request.brand ? BrandMapper.toResDto(request.brand) : null,
      user: UserMapper.toResDto(request.user),
    };
  }

  public static toModelResDto(request: RequestToCreateModelEntity): RequestToCreateModelResDto {
    return {
      _id: request._id,
      name: request.name,
      brand: BrandMapper.toResDto(request.brand),
      status: request.status,
      model: request.model ? ModelMapper.toResDto(request.model) : null,
      user: request.user ? UserMapper.toResDto(request.user) : null,
    };
  }

  public static toBrandResDtoList(
    requests: RequestToCreateBrandEntity[],
    total: number,
  ): RequestToCreateBrandListResDto {
    return { requests: requests.map(this.toBrandResDto), total };
  }

  public static toModelResDtoList(
    requests: RequestToCreateModelEntity[],
    total: number,
  ): RequestToCreateModelListResDto {
    return { requests: requests.map(this.toModelResDto), total };
  }
}
