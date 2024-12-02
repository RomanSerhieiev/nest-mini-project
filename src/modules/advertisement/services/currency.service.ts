import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CurrencyService {
  constructor(private readonly httpService: HttpService) {}

  public async getExchangeRates(): Promise<Record<string, number>> {
    const { data } = await lastValueFrom(
      this.httpService.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=5'),
    );

    return {
      USD: 1,
      EUR: data.find((rate) => rate.ccy === 'EUR')?.buy || 0,
      UAH: data.find((rate) => rate.ccy === 'USD')?.buy || 0,
    };
  }
}
