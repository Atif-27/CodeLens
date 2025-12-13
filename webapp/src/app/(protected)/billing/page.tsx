"use client";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { createCheckoutSession } from "@/lib/stripe-session";
import { api } from "@/trpc/react";
import { Info } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useState, useTransition } from "react";

function BillingPage() {
  const { data: user } = api.project.getMyCredits.useQuery();
  const [creditsToBuy, setCreditsToBuy] = useState<number[]>([100]);
  const creditsToBuyAmount = creditsToBuy[0] ?? 0;
  const price = (creditsToBuyAmount / 50).toFixed(2);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-lg font-semibold sm:text-xl">Billing</h1>

        <p className="mt-2 text-xs text-gray-500 sm:text-sm">
          Your current balance is {user?.credit} credits.
        </p>
      </div>
      <div className="mt-2 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-rose-600 sm:px-4">
        <div className="flex items-start gap-2">
          <Info className="mt-0.5 size-4 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs sm:text-sm">
              Each credit allows you to index 1 file in a repository.
            </p>
            <p className="mt-1 text-xs sm:text-sm">
              E.g. If your project has 100 files, you will need 100 credits to
              index all of them. You can buy more credits below.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 sm:mt-6">
        <Slider
          defaultValue={[100]}
          max={1000}
          min={50}
          step={10}
          onValueChange={(value) => setCreditsToBuy(value)}
          value={creditsToBuy}
          className="bg-blue-50"
        />
      </div>
      <Button
        className="mt-4 w-full sm:w-auto"
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const url = await createCheckoutSession(creditsToBuyAmount);
            redirect(url);
          });
        }}
      >
        {isPending
          ? "Processing..."
          : `Buy ${creditsToBuyAmount} credits for $${price}`}
      </Button>
    </div>
  );
}

export default BillingPage;
