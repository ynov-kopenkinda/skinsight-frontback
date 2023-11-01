import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { GetOffersDto } from './dto/get-offers.dto';
import { SteamTradeoffersService } from './steam-tradeoffers.service';

@ApiBearerAuth()
@Controller('/steam')
export class SteamApiController {
  constructor(
    private readonly steamTradeoffersService: SteamTradeoffersService,
  ) {}

  @Get('/offers')
  @ApiOkResponse({ description: 'Get all offers', type: GetOffersDto })
  offers(): Promise<GetOffersDto> {
    return this.steamTradeoffersService.getOffers();
  }
}
