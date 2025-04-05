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
import { timezonesList, timezoneType } from "@/lib/timezones";
import { defaultTimezone } from "@/lib/constants";

export function TimezoneComboBox() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedTimezone, setSelectedTimezone] =
    React.useState<timezoneType | null>(null);

  React.useEffect(() => {
    if (!selectedTimezone) {
      setSelectedTimezone(defaultTimezone);
    }
  }, [selectedTimezone]);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {selectedTimezone ? (
              <>{selectedTimezone.tzCode}</>
            ) : (
              <>+ Set Timezone</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList
            setOpen={setOpen}
            setSelectedTimezone={setSelectedTimezone}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {selectedTimezone ? (
            <>{selectedTimezone.tzCode}</>
          ) : (
            <>+ Set Timezone</>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle />
        <DrawerDescription />
        <div className="mt-4 border-t">
          <StatusList
            setOpen={setOpen}
            setSelectedTimezone={setSelectedTimezone}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  setOpen,
  setSelectedTimezone,
}: {
  setOpen: (open: boolean) => void;
  setSelectedTimezone: (status: timezoneType | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {timezonesList.map((timezone) => (
            <CommandItem
              key={timezone.label}
              value={timezone.tzCode}
              onSelect={(value) => {
                setSelectedTimezone(
                  timezonesList.find((priority) => priority.tzCode === value) ||
                    null
                );
                setOpen(false);
              }}
            >
              {timezone.tzCode}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
