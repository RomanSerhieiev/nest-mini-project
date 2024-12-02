import { Injectable } from '@nestjs/common';

import { BrandID } from '#entities/types/id.type';
import { UpdateBrandReqDto } from '#modules/brand/models/dto/req/update-brand.req.dto';
import { BrandResDto } from '#modules/brand/models/dto/res/brand.res.dto';
import { BrandListResDto } from '#modules/brand/models/dto/res/brand-list.res.dto';
import { BrandMapper } from '#modules/brand/presenters/brand.mapper';
import { BrandRepository } from '#modules/repository/services/brand.repository';
import { ModelRepository } from '#modules/repository/services/model.repository';

@Injectable()
export class BrandService {
  constructor(
    private readonly brandRepository: BrandRepository,
    private readonly modelRepository: ModelRepository,
  ) {}

  public async update(brandId: BrandID, dto: UpdateBrandReqDto): Promise<BrandResDto> {
    await this.isBrandExist(dto.name);
    const brand = await this.brandRepository.findOneBy({ _id: brandId });
    this.brandRepository.merge(brand, dto);
    const updatedBrand = await this.brandRepository.save(brand);

    return BrandMapper.toResDto(updatedBrand);
  }

  public async remove(brandId: BrandID): Promise<void> {
    await this.brandRepository.update({ _id: brandId }, { deleted: new Date() });
    await this.modelRepository.update({ brandId }, { deleted: new Date() });
  }

  public async findAll(): Promise<BrandListResDto> {
    const [brands, total] = await this.brandRepository.findAndCount();
    return BrandMapper.toResDtoList(brands, total);
  }

  public async findOne(brandId: BrandID): Promise<BrandResDto> {
    const brand = await this.brandRepository.findOneBy({ _id: brandId });
    return BrandMapper.toResDto(brand);
  }

  private async isBrandExist(name: string) {
    const brand = await this.brandRepository.findOneBy({ name });
    if (brand) {
      throw new Error('Brand already exists');
    }
  }
}
