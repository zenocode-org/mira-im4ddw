import React from 'react';
import { Text, Box } from 'spectacle';

/**
 * Reusable title component - update fontSize here to change everywhere.
 * Default: 2rem, bold, teal. Override via props as needed.
 */
export function MiraTitle({ children, fontSize = '2rem', ...props }) {
  return (
    <Text fontSize={fontSize} fontWeight="bold" color="#00a3a3" marginBottom={24} {...props}>
      {children}
    </Text>
  );
}

/**
 * Reusable subtitle component - update fontSize here to change everywhere.
 * Default: 1.5rem, gray. Override via props as needed.
 */
export function MiraSubtitle({ children, fontSize = '1.5rem', ...props }) {
  return (
    <Text fontSize={fontSize} color="#4a5568" {...props}>
      {children}
    </Text>
  );
}
