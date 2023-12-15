import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.book.createMany({
    data: [
      {
        title: "The Widow and the Beast",
      },
      {
        title: "Crown of Glass",
      },
      {
        title: "Kingdom of Birds and Beasts",
      },
      {
        title: "Feathers of Snow",
      },
      {
        title: "Feathers of Blood",
      },
      {
        title: "Kingdom of Feathers",
      },
    ],
  });

  const theWidowAndTheBeast = await prisma.book.findUnique({
    where: {
      title: "The Widow and the Beast",
    },
  });

  const crownOfGlass = await prisma.book.findUnique({
    where: {
      title: "Crow of Glass",
    },
  });

  const feathersOfSnow = await prisma.book.findUnique({
    where: {
      title: "Feathers of Snow",
    },
  });

  await prisma.transaction.createMany({
    data: [
      {
        title: "Publisher",
        amount: 1000,
        date: new Date("2021-08-01"),
        bookId: theWidowAndTheBeast?.id,
      },
      {
        title: "Book cover",
        amount: 4568,
        date: new Date("2021-07-12"),
        bookId: crownOfGlass?.id,
      },
      {
        title: "Editor",
        amount: 456,
        date: new Date("2023-12-25"),
        bookId: feathersOfSnow?.id,
      },
      {
        title: "Sarah",
        amount: 1000,
        date: new Date("2021-08-01"),
        bookId: crownOfGlass?.id,
      },
      {
        title: "Event",
        amount: 4568,
        date: new Date("2021-07-12"),
        bookId: crownOfGlass?.id,
      },
      {
        title: "Editor",
        amount: 456,
        date: new Date("2023-12-25"),
        bookId: theWidowAndTheBeast?.id,
      },
      {
        title: "Publisher",
        amount: 1000,
        date: new Date("2021-08-01"),
        bookId: theWidowAndTheBeast?.id,
      },
      {
        title: "Book cover",
        amount: 4568,
        date: new Date("2021-07-12"),
        bookId: crownOfGlass?.id,
      },
      {
        title: "Editor",
        amount: 456,
        date: new Date("2023-12-25"),
        bookId: feathersOfSnow?.id,
      },
      {
        title: "Sarah",
        amount: 1000,
        date: new Date("2021-08-01"),
        bookId: crownOfGlass?.id,
      },
      {
        title: "Event",
        amount: 4568,
        date: new Date("2021-07-12"),
        bookId: crownOfGlass?.id,
      },
      {
        title: "Editor",
        amount: 456,
        date: new Date("2023-12-25"),
        bookId: theWidowAndTheBeast?.id,
      },
      {
        title: "Publisher",
        amount: 1000,
        date: new Date("2021-08-01"),
        bookId: theWidowAndTheBeast?.id,
      },
      {
        title: "Book cover",
        amount: 4568,
        date: new Date("2021-07-12"),
        bookId: crownOfGlass?.id,
      },
      {
        title: "Editor",
        amount: 456,
        date: new Date("2023-12-25"),
        bookId: feathersOfSnow?.id,
      },
      {
        title: "Sarah",
        amount: 1000,
        date: new Date("2021-08-01"),
        bookId: crownOfGlass?.id,
      },
      {
        title: "Event",
        amount: 4568,
        date: new Date("2021-07-12"),
        bookId: crownOfGlass?.id,
      },
      {
        title: "Editor",
        amount: 456,
        date: new Date("2023-12-25"),
        bookId: theWidowAndTheBeast?.id,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
