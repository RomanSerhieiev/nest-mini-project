import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { AdvertisementEntity } from '#entities/advertisement.entity';
import { BrandEntity } from '#entities/brand.entity';
import { ModelEntity } from '#entities/model.entity';
import { AdvertisementID, BrandID, ModelID, UserID } from '#entities/types/id.type';
import { UserEntity } from '#entities/user.entity';
import { CreateAdReqDto } from '#modules/advertisement/models/dto/req/create-ad.req.dto';
import { UpdateAdReqDto } from '#modules/advertisement/models/dto/req/update-ad.req.dto';
import { AdResDto } from '#modules/advertisement/models/dto/res/ad.res.dto';
import { AdListResDto } from '#modules/advertisement/models/dto/res/ad-list.res.dto';
import { AdPremiumResDto } from '#modules/advertisement/models/dto/res/ad-premium.res.dto';
import { ECurrency } from '#modules/advertisement/models/enums/currency.enum';
import { AdMapper } from '#modules/advertisement/presenters/ad.mapper';
import { CurrencyService } from '#modules/advertisement/services/currency.service';
import { AdvertisementRepository } from '#modules/repository/services/advertisement.repository';
import { BrandRepository } from '#modules/repository/services/brand.repository';
import { ModelRepository } from '#modules/repository/services/model.repository';
import { UserRepository } from '#modules/repository/services/user.repository';
import { ViewRepository } from '#modules/repository/services/view.repository';
import { EUserMembership } from '#modules/users/models/enums/user-membership.enum';
import { EUserRole } from '#modules/users/models/enums/user-role.enum';
import { IUserData } from '#modules/users/models/interfaces/user-data.interface';

@Injectable()
export class AdService {
  constructor(
    private readonly advertisementRepository: AdvertisementRepository,
    private readonly brandRepository: BrandRepository,
    private readonly modelRepository: ModelRepository,
    private readonly userRepository: UserRepository,
    private readonly viewRepository: ViewRepository,
    private readonly currencyService: CurrencyService,
  ) {}

  public async create(userId: UserID, dto: CreateAdReqDto): Promise<AdResDto> {
    const user = await this.userRepository.findById(userId);
    if (user.membership === EUserMembership.BASE) {
      await this.attempts(user);
    }

    let failedAttempts: number = 0;
    const brand = await this.isBrandExist(dto.brand);
    const model = await this.isModelExist(dto.brand, dto.model);

    const isAvailable = await this.validateContent(dto.title, dto.description);
    if (!isAvailable) {
      failedAttempts = 1;
    }

    const ad = await this.advertisementRepository.save(
      this.advertisementRepository.create({
        ...dto,
        isAvailable,
        failedAttempts,
        user,
        brand,
        model,
      }),
    );

    return AdMapper.toResDto(ad);
  }

  public async update(
    adId: AdvertisementID,
    userId: UserID,
    dto: UpdateAdReqDto,
  ): Promise<AdResDto> {
    let failedAttempts: number;

    const ad = await this.isAdExist(adId, userId);
    if (ad.failedAttempts >= 3) {
      throw new ForbiddenException("You can't update this ad anymore.");
    }

    const isAvailable = await this.validateContent(dto.title, dto.description);
    if (!isAvailable) {
      failedAttempts = ad.failedAttempts + 1;
    } else {
      failedAttempts = ad.failedAttempts;
    }

    this.advertisementRepository.merge(ad, dto, { failedAttempts, isAvailable });
    const updatedAd = await this.advertisementRepository.save(ad);

    return AdMapper.toResDto(updatedAd);
  }

  public async remove(adId: AdvertisementID, userId: UserID): Promise<void> {
    await this.isAdExist(adId, userId);
    await this.advertisementRepository.update({ _id: adId }, { deleted: new Date() });
  }

  public async findAll(userData: IUserData): Promise<AdListResDto> {
    const [ads, total] = await this.advertisementRepository.findAll();

    const exchangeRates = await this.currencyService.getExchangeRates();

    const adsWithPrices = await Promise.all(
      ads.map(async (ad) => {
        const priceInUSD =
          ad.currency === ECurrency.USD ? +ad.price : +ad.price / exchangeRates[ad.currency];
        const priceInEUR =
          (priceInUSD * exchangeRates[ECurrency.UAH]) / exchangeRates[ECurrency.EUR];
        const priceInUAH = priceInUSD * exchangeRates[ECurrency.UAH];

        if (
          (userData.role === EUserRole.BUYER || userData.role === EUserRole.SELLER) &&
          userData.userId !== ad.userId
        ) {
          await this.trackView(ad._id, userData.userId);
        }

        return AdMapper.toResDtoWithPrices(ad, {
          USD: priceInUSD,
          EUR: priceInEUR,
          UAH: priceInUAH,
        });
      }),
    );

    return { ads: adsWithPrices, total };
  }

  public async findOne(userData: IUserData, adId: AdvertisementID): Promise<AdResDto> {
    const ad = await this.advertisementRepository.findById(adId);

    const exchangeRates = await this.currencyService.getExchangeRates();

    const priceInUSD =
      ad.currency === ECurrency.USD ? +ad.price : +ad.price / exchangeRates[ad.currency];
    const priceInEUR = (priceInUSD * exchangeRates[ECurrency.UAH]) / exchangeRates[ECurrency.EUR];
    const priceInUAH = priceInUSD * exchangeRates[ECurrency.UAH];

    if (
      (userData.role === EUserRole.BUYER || userData.role === EUserRole.SELLER) &&
      userData.userId !== ad.userId
    ) {
      await this.trackView(adId, userData.userId);
    }

    return AdMapper.toResDtoWithPrices(ad, { USD: priceInUSD, EUR: priceInEUR, UAH: priceInUAH });
  }

  public async findOnePremium(userId: UserID, adId: AdvertisementID): Promise<AdPremiumResDto> {
    const ad = await this.advertisementRepository.findById(adId);
    if (userId !== ad.userId) {
      throw new ForbiddenException("You can't get this ad");
    }
    if (!ad) {
      throw new NotFoundException('Advertisement not found');
    }

    const ads = await this.advertisementRepository.findByModel(ad.modelId);

    const cityAds = ads.filter((a) => a.city === ad.city);
    const regionAds = ads.filter((a) => a.region === ad.region);
    const countryAds = ads; // Всі оголошення вважаються у межах країни

    const averagePriceCity = this.calculateAveragePrice(cityAds);
    const averagePriceRegion = this.calculateAveragePrice(regionAds);
    const averagePriceCountry = this.calculateAveragePrice(countryAds);

    const viewsDay = await this.viewRepository.countByPeriod(adId, 'day');
    const viewsWeek = await this.viewRepository.countByPeriod(adId, 'week');
    const viewsMonth = await this.viewRepository.countByPeriod(adId, 'month');

    return {
      ad: AdMapper.toResDto(ad),
      averagePrices: {
        city: averagePriceCity,
        region: averagePriceRegion,
        country: averagePriceCountry,
      },
      views: {
        day: viewsDay,
        week: viewsWeek,
        month: viewsMonth,
      },
    };
  }

  private async attempts(user: UserEntity): Promise<void> {
    if (user.advertisements.length > 0) {
      throw new ForbiddenException(
        'You can only create one post. Get premium for unlimited ad creation.',
      );
    }
  }

  private async validateContent(title: string, description?: string): Promise<boolean> {
    const { Filter } = await import('bad-words');
    const filter = new Filter();

    return !(filter.isProfane(title) || (description && filter.isProfane(description)));
  }

  private async isBrandExist(brandId: BrandID): Promise<BrandEntity> {
    const brand = await this.brandRepository.findById(brandId);
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    return brand;
  }

  private async isModelExist(brandId: BrandID, modelId: ModelID): Promise<ModelEntity> {
    const model = await this.modelRepository.findByIdAndBrand(brandId, modelId);
    if (!model) {
      throw new NotFoundException('Model not found');
    }

    return model;
  }

  private async isAdExist(adId: AdvertisementID, userId: UserID): Promise<AdvertisementEntity> {
    const ad = await this.advertisementRepository.findByIdAndUser(adId, userId);
    if (!ad) {
      throw new NotFoundException('Advertisement not found');
    }

    return ad;
  }

  private async trackView(adId: AdvertisementID, userId: UserID): Promise<void> {
    const view = await this.viewRepository.findOne({
      where: { advertisementId: adId, userId },
    });

    if (!view) {
      await this.viewRepository.save(this.viewRepository.create({ advertisementId: adId, userId }));
    }
  }

  private calculateAveragePrice(ads: AdvertisementEntity[]): number {
    if (ads.length === 0) return 0;
    const total = ads.reduce((sum, ad) => sum + Number(ad.price), 0);
    return total / ads.length;
  }
}
