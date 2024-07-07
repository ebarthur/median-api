import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import * as bcrypt from 'bcrypt'

const roundsOfHashing = parseInt(process.env.HASHING_ROUNDS) || 10

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    )

    createUserDto.password = hashedPassword

    return this.prisma.user.create({
      data: createUserDto,
    })
  }

  findAll() {
    return this.prisma.user.findMany()
  }

  findOne(id: string) {
    const user = this.prisma.user.findFirst({ where: { id } })

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`)
    }

    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      )
    }
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    })
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } })
  }
}
