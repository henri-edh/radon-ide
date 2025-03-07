export enum DevicePlatform {
  IOS = "iOS",
  Android = "Android",
}

export type DeviceInfo = AndroidDeviceInfo | IOSDeviceInfo;

export type AndroidDeviceInfo = {
  id: string;
  platform: DevicePlatform.Android;
  avdId: string;
  modelId: string;
  systemName: string;
  displayName: string;
  available: boolean;
};

export type IOSDeviceInfo = {
  id: string;
  platform: DevicePlatform.IOS;
  UDID: string;
  modelId: string;
  systemName: string;
  displayName: string;
  available: boolean;
  runtimeInfo: IOSRuntimeInfo;
};

export type AndroidSystemImageInfo = {
  name: string;
  location: string;
  apiLevel: number;
  available: boolean;
};

export type IOSDeviceTypeInfo = {
  name: string;
  identifier: string;
};

export type IOSRuntimeInfo = {
  platform: "iOS" | "tvOS" | "watchOS";
  identifier: string;
  name: string;
  version: string;
  supportedDeviceTypes: IOSDeviceTypeInfo[];
  available: boolean;
};

export interface DeviceManagerEventMap {
  devicesChanged: DeviceInfo[];
  deviceRemoved: DeviceInfo;
}

export type DeviceManagerEventListener<K extends keyof DeviceManagerEventMap> = (
  event: DeviceManagerEventMap[K]
) => void;

export interface DeviceManagerInterface {
  listAllDevices(): Promise<DeviceInfo[]>;

  createAndroidDevice(
    modelId: string,
    displayName: string,
    systemImage: AndroidSystemImageInfo
  ): Promise<DeviceInfo>;
  createIOSDevice(
    deviceType: IOSDeviceTypeInfo,
    displayName: string,
    runtime: IOSRuntimeInfo
  ): Promise<DeviceInfo>;

  renameDevice(device: DeviceInfo, newDisplayName: string): Promise<void>;
  removeDevice(device: DeviceInfo): Promise<void>;

  listInstalledAndroidImages(): Promise<AndroidSystemImageInfo[]>;
  listInstalledIOSRuntimes(): Promise<IOSRuntimeInfo[]>;

  addListener<K extends keyof DeviceManagerEventMap>(
    eventType: K,
    listener: DeviceManagerEventListener<K>
  ): Promise<void>;
  removeListener<K extends keyof DeviceManagerEventMap>(
    eventType: K,
    listener: DeviceManagerEventListener<K>
  ): Promise<void>;
}
