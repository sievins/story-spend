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
        amount: 1234,
        date: new Date("2021-08-02"),
        bookId: theWidowAndTheBeast?.id,
      },
      {
        title: "Book cover",
        amount: 2345,
        date: new Date("2021-07-12"),
        bookId: crownOfGlass?.id,
      },
      {
        title: "Editor",
        amount: 3456,
        date: new Date("2023-12-21"),
        bookId: feathersOfSnow?.id,
      },
      {
        title: "Sarah",
        amount: 4567,
        date: new Date("2021-08-01"),
        bookId: crownOfGlass?.id,
      },
      {
        title: "Event",
        amount: 5678,
        date: new Date("2021-07-13"),
        bookId: crownOfGlass?.id,
      },
      {
        title: "Editor",
        amount: 6789,
        date: new Date("2023-12-22"),
        bookId: theWidowAndTheBeast?.id,
      },
      {
        title: "Publisher",
        amount: 123,
        date: new Date("2021-08-03"),
        bookId: theWidowAndTheBeast?.id,
      },
      {
        title: "Book cover",
        amount: 234,
        date: new Date("2021-07-14"),
        bookId: crownOfGlass?.id,
      },
      {
        title: "Editor",
        amount: 345,
        date: new Date("2023-12-23"),
        bookId: feathersOfSnow?.id,
      },
      {
        title: "Sarah",
        amount: 456,
        date: new Date("2021-08-04"),
        bookId: crownOfGlass?.id,
      },
      {
        title: "Event",
        amount: 567,
        date: new Date("2021-07-15"),
        bookId: crownOfGlass?.id,
      },
      {
        title: "Editor",
        amount: 678,
        date: new Date("2023-12-24"),
        bookId: theWidowAndTheBeast?.id,
      },
      {
        title: "Publisher",
        amount: 789,
        date: new Date("2021-08-05"),
        bookId: theWidowAndTheBeast?.id,
      },
      {
        title: "Book cover",
        amount: 12,
        date: new Date("2021-07-16"),
        bookId: crownOfGlass?.id,
      },
      {
        title: "Editor",
        amount: 23,
        date: new Date("2023-12-25"),
        bookId: feathersOfSnow?.id,
      },
      {
        title: "Sarah",
        amount: 34,
        date: new Date("2021-08-06"),
        bookId: crownOfGlass?.id,
      },
      {
        title: "Event",
        amount: 45,
        date: new Date("2021-07-17"),
        bookId: crownOfGlass?.id,
      },
      {
        title: "Editor",
        amount: 56,
        date: new Date("2023-12-26"),
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
