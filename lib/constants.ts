import { Currency } from "@/lib/currencies";
import { timezoneType } from "@/lib/timezones";

export const navbarItems = [
  { label: "Dashboard", link: "/" },
  { label: "Transactions", link: "/transactions" },
  { label: "Manage", link: "/manage" },
];

export const defaultCurrency: Currency = {
  value: "INR",
  label: "₹ Rupee",
  locale: "hi-IN",
};

export const defaultTimezone: timezoneType = {
  label: "Asia/Kolkata (GMT+05:30)",
  tzCode: "Asia/Kolkata",
  name: "(GMT+05:30) Mumbai, Delhi, Bengaluru, Kolkata, Chennai",
  utc: "+05:30",
};
