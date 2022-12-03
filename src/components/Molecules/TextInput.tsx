import { TextInput as MTextInput } from "@mantine/core";
import type { TextInputProps } from "@mantine/core";

export default function TextInput(props: TextInputProps) {
  return (
    <MTextInput
      {...props}
      classNames={{
        ...props.classNames,
        rightSection: `rightIcon ${props.classNames?.rightSection}`,
        input: `bg-p-white-green ${props.classNames?.input}`,
      }}
    />
  );
}
