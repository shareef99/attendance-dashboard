import { Loader as MLoader } from "@mantine/core";
import type { LoaderProps } from "@mantine/core";

export default function Loader({
  fullscreen = false,
  loaderWrapper,
  ...props
}: LoaderProps & { fullscreen?: boolean; loaderWrapper?: string }) {
  return (
    <div
      className={`${fullscreen && "flex h-[80vh] justify-center"} ${
        loaderWrapper && loaderWrapper
      }`}
    >
      <MLoader color="p.1" {...props} />
    </div>
  );
}
