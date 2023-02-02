import { notFoundError } from "@/errors";
import eventRepository from "@/repositories/event-repository";
import { exclude } from "@/utils/prisma-utils";
import { Event } from "@prisma/client";
import dayjs from "dayjs";

async function getHotelsList(): Promise<GetFirstEventResult> {
  const event = await eventRepository.findFirst();
  if (!event) throw notFoundError();

  return exclude(event, "createdAt", "updatedAt");
}

export type GetFirstEventResult = Omit<Event, "createdAt" | "updatedAt">;

async function getHotelRooms(): Promise<boolean> {
  const event = await eventRepository.findFirst();
  if (!event) return false;

  const now = dayjs();
  const eventStartsAt = dayjs(event.startsAt);
  const eventEndsAt = dayjs(event.endsAt);

  return now.isAfter(eventStartsAt) && now.isBefore(eventEndsAt);
}

const hotelsService = {
  getHotelsList,
  getHotelRooms,
};

export default hotelsService;
