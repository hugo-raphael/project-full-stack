import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createContactDto: CreateContactDto, @Request() req) {
    return this.contactsService.create(createContactDto, req.user.id);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.contactsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(id);
  }

  @Get('client/:clientId/contacts')
  @UseGuards(JwtAuthGuard)
  async getContactsByClientId(@Param('clientId') clientId: string) {
    return this.contactsService.getContactsByClientId(clientId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsService.update(id, updateContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsService.remove(id);
  }
}
