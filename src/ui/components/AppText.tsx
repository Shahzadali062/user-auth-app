import React from 'react';
import { Text, TextProps } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export type AppTextVariant =
  | 'body'
  | 'label'
  | 'title'
  | 'headline'
  | 'error'
  | 'button'
  | 'caption';

type Props = TextProps & {
  variant?: AppTextVariant;
};

export default function AppText({
  variant = 'body',
  style,
  children,
  ...props
}: Props) {
  let variantStyle = {
    color: colors.text,
    fontFamily: typography.family.regular,
    fontSize: typography.size.md,
  };

  switch (variant) {
    case 'label':
      variantStyle = {
        color: colors.muted,
        fontFamily: typography.family.medium,
        fontSize: typography.size.sm,
      };
      break;

    case 'title':
      variantStyle = {
        color: colors.text,
        fontFamily: typography.family.semibold,
        fontSize: typography.size.lg,
      };
      break;

    case 'headline':
      variantStyle = {
        color: colors.text,
        fontFamily: typography.family.bold,
        fontSize: typography.size.xl,
      };
      break;

    case 'error':
      variantStyle = {
        color: colors.danger,
        fontFamily: typography.family.regular,
        fontSize: typography.size.sm,
      };
      break;

    case 'button':
      variantStyle = {
        color: 'white',
        fontFamily: typography.family.medium,
        fontSize: typography.size.md,
      };
      break;

    case 'caption':
      variantStyle = {
        color: colors.muted,
        fontFamily: typography.family.regular,
        fontSize: typography.size.xs,
      };
      break;
  }

  return (
    <Text {...props} style={[variantStyle, style]}>
      {children}
    </Text>
  );
}
