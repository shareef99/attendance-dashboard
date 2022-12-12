import { Select as MSelect } from "@mantine/core";
import type { SelectProps } from "@mantine/core";

export default function Select(props: SelectProps) {
  return (
    <MSelect
      {...props}
      classNames={{
        ...props.classNames,
        rightSection: `rightIcon ${props.classNames?.rightSection}`,
        input: `${props.classNames?.input}`,
      }}
    />
  );
}
