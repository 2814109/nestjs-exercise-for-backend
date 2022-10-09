import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Book } from "../entity/book";
import { NewBookInput } from "./dto/newBook.input";

@Injectable()
export class BooksService {
  // def entity at constructor
  constructor(
    @InjectRepository(Book)
    private booksRepositoty: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    // ref to member variable of repository
    return this.booksRepositoty.find();
  }

  findOneById(id: number): Promise<Book> {
    // fix : if use argument as id, then error that is not exist roperty, so def argument as wehre object
    return this.booksRepositoty.findOne({ where: { id } });
  }

  async create(data: NewBookInput): Promise<Book> {
    const book = this.booksRepositoty.create(data);
    await this.booksRepositoty.save(book);
    return book;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.booksRepositoty.delete(id);
    return result.affected > 0;
  }
}
