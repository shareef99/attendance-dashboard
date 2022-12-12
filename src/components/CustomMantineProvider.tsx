import type { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";

type Props = {
  children: ReactNode;
};

export default function CustomMantineProvider({ children }: Props) {
  return (
    <MantineProvider
      theme={{
        fontFamily: "Inter, sans-serif",
        loader: "bars",
        transitionTimingFunction: "ease-in",
        colors: {
          p: ["#2a4d69", "#4c86b4", "#adcbe3", "#e7eef6"],
          blue: [
            "#eff6ff",
            "#dbeafe",
            "#bfdbfe",
            "#93c5fd",
            "#60a5fa",
            "#3b82f6",
            "#2563eb",
            "#1d4ed8",
            "#1e40af",
            "#1e3a8a",
          ],
          gray: [
            "#f9fafb",
            "#f3f4f6",
            "#e5e7eb",
            "#d1d5db",
            "#9ca3af",
            "#6b7280",
            "#4b5563",
            "#374151",
            "#1f2937",
            "#111827",
          ],
          red: [
            "#fef2f2",
            "#fee2e2",
            "#fecaca",
            "#fca5a5",
            "#f87171",
            "#ef4444",
            "#dc2626",
            "#b91c1c",
            "#991b1b",
            "#7f1d1d",
          ],
          teal: [
            "#f0fdfa",
            "#ccfbf1",
            "#99f6e4",
            "#5eead4",
            "#2dd4bf",
            "#14b8a6",
            "#0d9488",
            "#0f766e",
            "#115e59",
            "#134e4a",
          ],
        },
      }}
    >
      {children}
    </MantineProvider>
  );
}
