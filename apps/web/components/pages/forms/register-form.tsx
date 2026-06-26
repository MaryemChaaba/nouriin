"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  checkoutSchema,
  CheckoutFormValues,
  tunisianCities,
} from "@/lib/shema";
import { processDirectCheckout } from "@/lib/checkoutDirect";
import { toast } from "sonner";
import { useStore } from "@/lib/store";
import { useState } from "react";

export default function CheckoutForm() {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      city: undefined,
    },
  });

  const {
    items: cartItemsWithQuantities,
    removeItem: removeFromCart,
    addItem,
    deleteCartProduct,
    resetCart: clearCart,
    getItemCount: totalCartItems,
    getTotalPrice,
    getSubTotalPrice,
  } = useStore();
  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      // if (!auth_token) {
      //   toast.error("You must be logged in to place an order.");
      //   return;
      // }

      await processDirectCheckout(data, cartItemsWithQuantities, {
        onStart: () => setIsCheckingOut(true),
        onSuccess: () => {
          toast.success("Redirecting to secure gateway...");
          setIsCheckingOut(false);
        },
        onError: (message) => {
          toast.error(message);
          setIsCheckingOut(false);
        },
      });
    } catch (error) {
      console.error("Error creating direct checkout:", error);
      toast.error("Failed to process checkout. Please try again.");
      setIsCheckingOut(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
        lang="ar"
        dir="rtl"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الاسم *</FormLabel>
              <FormControl>
                <Input placeholder="الاسم" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الهاتف *</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="20123456" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>العنوان *</FormLabel>
              <FormControl>
                <Input placeholder="العنوان" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>المدينة *</FormLabel>

              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختر المدينة" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {tunisianCities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          disabled={isCheckingOut || cartItemsWithQuantities.length === 0}
          className="w-full mt-6 bg-black hover:bg-gray-800 text-white rounded-full py-3 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCheckingOut ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Creating Order...
            </>
          ) : cartItemsWithQuantities.length === 0 ? (
            "Select items to checkout"
          ) : (
            `Proceed to checkout (${cartItemsWithQuantities.length} ${cartItemsWithQuantities.length === 1 ? "item" : "items"})`
          )}
        </Button>
      </form>
    </Form>
  );
}
