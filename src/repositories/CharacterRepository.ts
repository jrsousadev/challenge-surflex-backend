import { prismaClient } from "../database/prismaClient";

interface ICreateCharacter {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "unknown";
  originId: string;
  locationId: string;
  image: string;
  episode: string[];
  url: string;
  userId: string;
}

interface IGetCharacter {
  id: number;
}

interface IDeleteCharacter {
  id: number;
}

interface IGetAllCharacter {
  id: string;
  name: string;
  species: string;
}

export class CharacterRepository {
  async create({
    episode,
    gender,
    id,
    image,
    name,
    species,
    status,
    type,
    url,
    userId,
    originId,
    locationId,
  }: ICreateCharacter) {
    try {
      return await prismaClient.character.create({
        data: {
          id,
          name,
          episode,
          gender,
          image,
          species,
          status,
          type,
          url,
          userId,
          originId,
          locationId,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getOne({ id }: IGetCharacter) {
    try {
      return await prismaClient.character.findFirst({
        where: {
          id,
        },
        include: {
          origin: true,
          location: true,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getAll({ id, name, species }: IGetAllCharacter) {
    try {
      return await prismaClient.character.findMany({
        where: {
          userId: id,
          name: {
            contains: name,
          },
          species: {
            contains: species,
          },
        },
        include: {
          origin: true,
          location: true,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async delete({ id }: IDeleteCharacter) {
    try {
      return await prismaClient.character.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
