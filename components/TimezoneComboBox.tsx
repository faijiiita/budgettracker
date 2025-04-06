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
import { UserSettings } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { UpdateUserTimezone } from "@/app/wizard/_actions/userSettings";
import { toast } from "sonner";

export function TimezoneComboBox({
  userSettings,
}: {
  userSettings: UserSettings | undefined;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedTimezone, setSelectedTimezone] =
    React.useState<timezoneType | null>(null);

  React.useEffect(() => {
    if (!userSettings) return;

    const userTimezone = timezonesList.find(
      (timezone) => timezone.tzCode === userSettings.timezone
    );
    if (userTimezone) setSelectedTimezone(userTimezone);
  }, [userSettings]);

  const mutation = useMutation({
    mutationFn: UpdateUserTimezone,
    onSuccess: (data: UserSettings) => {
      toast.success("Timezone updated Successfully 🎉", {
        id: "update-timezone",
      });

      setSelectedTimezone(
        timezonesList.find((t) => t.tzCode === data.timezone) || null
      );
    },
    onError: (e) => {
      toast.error(`Someting went wrong: ${e.message}`, {
        id: "update-timezone",
      });
    },
  });

  const selectTimezone = React.useCallback(
    (timezone: timezoneType | null) => {
      {
        if (!timezone) {
          toast.error("Please select a timezone");
          return;
        }

        toast.loading("Updating Timezone...", {
          id: "update-timezone",
        });

        mutation.mutate(timezone.tzCode);
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
            {selectedTimezone ? (
              <>{selectedTimezone.tzCode}</>
            ) : (
              <>+ Set Timezone</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList setOpen={setOpen} setSelectedTimezone={selectTimezone} />
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
          <StatusList setOpen={setOpen} setSelectedTimezone={selectTimezone} />
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
