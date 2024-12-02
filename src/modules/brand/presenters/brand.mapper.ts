import { BrandEntity } from '#entities/brand.entity';
import { BrandResDto } from '#modules/brand/models/dto/res/brand.res.dto';
import { BrandListResDto } from '#modules/brand/models/dto/res/brand-list.res.dto';

export class BrandMapper {
  public static toResDto(brand: BrandEntity): BrandResDto {
    return {
      _id: brand._id,
      name: brand.name,
      advertisements: brand.advertisements
        ? brand.advertisements.map((advertisement) => advertisement._id)
        : [],
      models: brand.models ? brand.models.map((model) => model._id) : [],
      requestToCreate: brand.requestToCreate._id,
      requestsToCreateModel: brand.requestsToCreateModel
        ? brand.requestsToCreateModel.map((requestToCreateModel) => requestToCreateModel._id)
        : [],
    };
  }

  public static toResDtoList(brands: BrandEntity[], total: number): BrandListResDto {
    return { brands: brands.map(this.toResDto), total };
  }
}
