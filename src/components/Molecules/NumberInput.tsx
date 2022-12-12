import { NumberInput as MNumberInput } from "@mantine/core";
import type { NumberInputProps } from "@mantine/core";

export default function NumberInput(props: NumberInputProps) {
  return (
    <MNumberInput
      classNames={{
        ...props.classNames,
        rightSection: `rightIcon ${props.classNames?.rightSection}`,
        input: `${props.classNames?.input}`,
      }}
      hideControls={props.hideControls === false ? true : false}
      {...props}
    />
  );
}
