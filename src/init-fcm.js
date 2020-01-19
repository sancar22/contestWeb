import * as firebase from "firebase/app";
import "firebase/messaging";

const messaging = firebase.messaging();
messaging.usePublicVapidKey(
  "BKm0hHsl7j1dwJHcan2I1LJLpwlYgRnlzV1FP1MOxd60Za7myyIGCWEgyfaVWhH_cM5Vh61H0d6kz8LGrlO-tQk"
);

export { messaging };
