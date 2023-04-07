import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoAppcenterBaseViewProps } from './ExpoAppcenterBase.types';

const NativeView: React.ComponentType<ExpoAppcenterBaseViewProps> =
  requireNativeViewManager('ExpoAppcenterBase');

export default function ExpoAppcenterBaseView(props: ExpoAppcenterBaseViewProps) {
  return <NativeView {...props} />;
}
