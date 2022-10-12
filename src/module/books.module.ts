import { Module } from "@nestjs/common";
import { BooksService } from "../service/books.service";
import { Book } from "src/entity/book.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BooksResolver } from "../resolver/books.resolver";
@Module({
  // def Entity as TypeORM Module
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BooksService, BooksResolver],
  exports: [BooksService, TypeOrmModule],
})
export class BooksModule {}