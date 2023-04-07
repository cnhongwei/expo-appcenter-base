import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoAppcenterBase.web.ts
// and on native platforms to ExpoAppcenterBase.ts
import ExpoAppcenterBaseModule from './ExpoAppcenterBaseModule';
import ExpoAppcenterBaseView from './ExpoAppcenterBaseView';
import { ChangeEventPayload, ExpoAppcenterBaseViewProps } from './ExpoAppcenterBase.types';

// Get the native constant value.
export const PI = ExpoAppcenterBaseModule.PI;

export function hello(): string {
  return ExpoAppcenterBaseModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoAppcenterBaseModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoAppcenterBaseModule ?? NativeModulesProxy.ExpoAppcenterBase);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoAppcenterBaseView, ExpoAppcenterBaseViewProps, ChangeEventPayload };
