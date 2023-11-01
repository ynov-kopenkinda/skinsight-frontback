import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetOffersDto } from './dto/get-offers.dto';
import { SteamTradeoffersService } from './steam-tradeoffers.service';

@Controller('/steam')
export class SteamApiController {
  constructor(
    private readonly steamTradeoffersService: SteamTradeoffersService,
  ) {}

  @Get('/offers')
  @ApiOkResponse({ description: 'Get all offers' })
  offers(): Promise<GetOffersDto> {
    return this.steamTradeoffersService.getOffers();
  }
}
