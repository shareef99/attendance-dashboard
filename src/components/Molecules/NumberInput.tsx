import { NumberInput as MNumberInput } from "@mantine/core";
import type { NumberInputProps } from "@mantine/core";

export default function NumberInput(
  props: NumberInputProps & { styleDisable?: boolean }
) {
  return (
    <MNumberInput
      classNames={{
        ...props.classNames,
        rightSection: `rightIcon ${props.classNames?.rightSection}`,
        disabled: `${props.styleDisable && "!text-black"} ${
          props.classNames?.disabled
        }`,
      }}
      hideControls={props.hideControls === false ? true : false}
      {...props}
    />
  );
}
