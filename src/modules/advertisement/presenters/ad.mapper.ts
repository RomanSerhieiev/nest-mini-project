import { AdvertisementEntity } from '#entities/advertisement.entity';
import { AdResDto } from '#modules/advertisement/models/dto/res/ad.res.dto';
import { AdListResDto } from '#modules/advertisement/models/dto/res/ad-list.res.dto';
import { BrandMapper } from '#modules/brand/presenters/brand.mapper';
import { ModelMapper } from '#modules/model/presenters/model.mapper';
import { UserMapper } from '#modules/users/presenters/user.mapper';

export class AdMapper {
  public static toResDto(ad: AdvertisementEntity): AdResDto {
    return {
      _id: ad._id,
      title: ad.title,
      description: ad.description,
      price: ad.price,
      currency: ad.currency,
      year: ad.year,
      city: ad.city,
      region: ad.region,
      failedAttempts: ad.failedAttempts,
      isAvailable: ad.isAvailable,
      image: ad.image,
      views: ad.views ? ad.views.map((view) => view._id).length : 0,
      reviews: ad.reviews ? ad.reviews.map((review) => review._id) : [],
      dialogues: ad.dialogues ? ad.dialogues.map((dialogue) => dialogue._id) : [],
      user: UserMapper.toResDto(ad.user),
      brand: BrandMapper.toResDto(ad.brand),
      model: ModelMapper.toResDto(ad.model),
    };
  }

  public static toResDtoWithPrices(
    ad: AdvertisementEntity,
    prices: { USD: number; EUR: number; UAH: number },
  ): AdResDto {
    return {
      ...this.toResDto(ad),
      prices: {
        USD: +prices.USD.toFixed(2),
        EUR: +prices.EUR.toFixed(2),
        UAH: +prices.UAH.toFixed(2),
      },
    };
  }

  public static toResDtoList(ads: AdvertisementEntity[], total: number): AdListResDto {
    return { ads: ads.map(this.toResDto), total };
  }
}
