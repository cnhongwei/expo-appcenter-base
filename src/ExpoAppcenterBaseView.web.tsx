import * as React from 'react';

import { ExpoAppcenterBaseViewProps } from './ExpoAppcenterBase.types';

export default function ExpoAppcenterBaseView(props: ExpoAppcenterBaseViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
