import { Select as MSelect } from "@mantine/core";
import type { SelectProps } from "@mantine/core";

export default function Select(
  props: SelectProps & { styleDisable?: boolean }
) {
  return (
    <MSelect
      {...props}
      classNames={{
        ...props.classNames,
        rightSection: `rightIcon ${props.classNames?.rightSection}`,
        disabled: `${props.styleDisable && "!text-black"} ${
          props.classNames?.disabled
        }`,
      }}
    />
  );
}
