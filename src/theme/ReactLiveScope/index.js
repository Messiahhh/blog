/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { Button, Space, message } from 'antd'
import 'antd/dist/antd.css';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  Button,
  Space,
  message,
  ...React,
};
export default ReactLiveScope;
