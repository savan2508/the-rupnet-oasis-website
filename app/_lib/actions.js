"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import supabase from "@/app/_services/supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "@/app/_lib/data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfile(formData) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  // write a regex to validate nationalID to verify the text is between 6 and 12 digits
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Invalid National ID");
  }

  const updateData = { nationality, nationalID, countryFlag };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    throw new Error("Error updating profile");
  }

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("Unauthorized to delete this reservation");
  }

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Error deleting reservation");
  }

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const bookingId = Number(formData.get("bookingId"));
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations").slice(0, 1000);

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("Unauthorized to update this reservation");
  }

  const { error } = await supabase
    .from("bookings")
    .update({ numGuests, observations })
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    throw new Error("Error updating reservation");
  }

  revalidatePath("/account/reservations");
  revalidatePath("/account/reservations/edit/" + bookingId);
  redirect("/account/reservations");
}
