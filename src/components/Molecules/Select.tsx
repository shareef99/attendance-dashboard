import { Select as MSelect } from "@mantine/core";
import type { SelectProps } from "@mantine/core";

export default function Select(props: SelectProps) {
  return (
    <MSelect
      {...props}
      classNames={{
        rightSection: "rightIcon",
        input: "bg-p-white-green",
      }}
      styles={(theme) => ({
        item: {
          // "&:hover": { backgroundColor: theme.colors.p[2] },
          // "&:active": { backgroundColor: theme.colors.p[2] },
        },
      })}
    />
  );
}
