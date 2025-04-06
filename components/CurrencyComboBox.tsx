"use client";

import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Currencies, Currency } from "@/lib/currencies";
import { UserSettings } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { UpdateUserCurrency } from "@/app/wizard/_actions/userSettings";
import { toast } from "sonner";

export function CurrencyComboBox({
  userSettings,
}: {
  userSettings: UserSettings | undefined;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedCurrency, setSelectedCurrency] =
    React.useState<Currency | null>(null);

  React.useEffect(() => {
    if (!userSettings) return;

    const userCurrency = Currencies.find(
      (currency) => currency.value === userSettings.currency
    );
    if (userCurrency) setSelectedCurrency(userCurrency);
  }, [userSettings]);

  const mutation = useMutation({
    mutationFn: UpdateUserCurrency,
    onSuccess: (data: UserSettings) => {
      toast.success("Currency updated Successfully 🎉", {
        id: "update-currency",
      });

      setSelectedCurrency(
        Currencies.find((c) => c.value === data.currency) || null
      );
    },
    onError: (e) => {
      toast.error(`Someting went wrong: ${e.message}`, {
        id: "update-currency",
      });
    },
  });

  const selectCurrency = React.useCallback(
    (currency: Currency | null) => {
      {
        if (!currency) {
          toast.error("Please select a currency");
          return;
        }

        toast.loading("Updating Currency...", {
          id: "update-currency",
        });

        mutation.mutate(currency.value);
      }
    },
    [mutation]
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start"
            disabled={mutation.isPending}
          >
            {selectedCurrency ? (
              <>{selectedCurrency.label}</>
            ) : (
              <>+ Set Currency</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList setOpen={setOpen} setSelectedCurrency={selectCurrency} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start"
          disabled={mutation.isPending}
        >
          {selectedCurrency ? (
            <>{selectedCurrency.label}</>
          ) : (
            <>+ Set Currency</>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle />
        <DrawerDescription />
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} setSelectedCurrency={selectCurrency} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  setOpen,
  setSelectedCurrency,
}: {
  setOpen: (open: boolean) => void;
  setSelectedCurrency: (status: Currency | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {Currencies.map((currency) => (
            <CommandItem
              key={currency.value}
              value={currency.value}
              onSelect={(value) => {
                setSelectedCurrency(
                  Currencies.find((priority) => priority.value === value) ||
                    null
                );
                setOpen(false);
              }}
            >
              {currency.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
