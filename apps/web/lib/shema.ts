import { z } from "zod";

export const tunisianCities = [
  "Tunis",
  "Ariana",
  "Ben Arous",
  "Manouba",
  "Nabeul",
  "Zaghouan",
  "Bizerte",
  "Béja",
  "Jendouba",
  "Le Kef",
  "Siliana",
  "Sousse",
  "Monastir",
  "Mahdia",
  "Sfax",
  "Kairouan",
  "Kasserine",
  "Sidi Bouzid",
  "Gabès",
  "Médenine",
  "Tataouine",
  "Gafsa",
  "Tozeur",
  "Kebili",
] as const;

export const checkoutSchema = z.object({
  name: z
    .string()
    .min(3, "الاسم يجب أن يحتوي على 3 أحرف على الأقل"),

  phone: z
    .string()
    .regex(
      /^(2|4|5|9)\d{7}$/,
      "يرجى إدخال رقم هاتف تونسي صحيح"
    ),

  address: z
    .string()
    .min(5, "العنوان مطلوب"),

  city: z.enum(tunisianCities, {
    errorMap: () => ({
      message: "يرجى اختيار المدينة",
    }),
  }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;