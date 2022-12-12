import {
  showNotification as MShowNotification,
  updateNotification as MUpdateNotification,
} from "@mantine/notifications";
import type { NotificationProps } from "@mantine/notifications";

export function showNotification(props: NotificationProps) {
  MShowNotification({ ...props, color: "p.1" });
}

export function loadingNotification(props: NotificationProps) {
  MShowNotification({
    ...props,
    loading: true,
    autoClose: false,
    disallowClose: true,
    color: "p.1",
  });
}

export function updateNotification(props: NotificationProps & { id: string }) {
  MUpdateNotification({ ...props, color: "p.1" });
}

export function successNotification(props: NotificationProps & { id: string }) {
  MUpdateNotification({
    ...props,
    color: "teal",
    loading: false,
    autoClose: 3000,
  });
}

export function errNotification(
  props: NotificationProps & { id: string },
  update = true
) {
  if (update) {
    MUpdateNotification({
      ...props,
      color: "red",
      loading: false,
      autoClose: 3000,
    });
  } else {
    MShowNotification({ ...props, color: "red" });
  }
}
