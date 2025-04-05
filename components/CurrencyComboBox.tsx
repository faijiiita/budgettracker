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
import { defaultCurrency } from "@/lib/constants";

export function CurrencyComboBox() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedCurrency, setSelectedCurrency] =
    React.useState<Currency | null>(null);

  React.useEffect(() => {
    if (!selectedCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [selectedCurrency]);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {selectedCurrency ? (
              <>{selectedCurrency.label}</>
            ) : (
              <>+ Set Currency</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList
            setOpen={setOpen}
            setSelectedCurrency={setSelectedCurrency}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
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
          <StatusList
            setOpen={setOpen}
            setSelectedCurrency={setSelectedCurrency}
          />
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
