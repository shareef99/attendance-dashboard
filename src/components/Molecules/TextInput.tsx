import { TextInput as MTextInput } from "@mantine/core";
import type { TextInputProps } from "@mantine/core";

export default function TextInput(
  props: TextInputProps & { styleDisable?: boolean }
) {
  return (
    <MTextInput
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
