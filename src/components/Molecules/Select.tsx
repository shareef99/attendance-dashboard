import { Select as MSelect } from "@mantine/core";
import type { SelectProps } from "@mantine/core";

export default function Select({
  styleDisable,
  ...props
}: SelectProps & { styleDisable?: boolean }) {
  return (
    <MSelect
      {...props}
      classNames={{
        ...props.classNames,
        rightSection: `rightIcon ${props.classNames?.rightSection}`,
        disabled: `${styleDisable && "!text-black"} ${
          props.classNames?.disabled
        }`,
      }}
    />
  );
}
