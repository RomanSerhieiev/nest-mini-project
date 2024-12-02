import { ApiProperty } from '@nestjs/swagger';

import { AdResDto } from '#modules/advertisement/models/dto/res/ad.res.dto';

export class AdPremiumResDto {
  @ApiProperty({ description: 'Advertisement details' })
  ad: AdResDto;

  @ApiProperty({ description: 'Average prices by location' })
  averagePrices: {
    city: number;
    region: number;
    country: number;
  };

  @ApiProperty({ description: 'Number of views by period' })
  views: {
    day: number;
    week: number;
    month: number;
  };
}
