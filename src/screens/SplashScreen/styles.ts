import { StyleSheet } from 'react-native';
import { colors } from '../../ui/theme/colors';
import { typography } from '../../ui/theme/typography';

export const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },

  title: {
    textAlign: 'center',
    color: colors.text,
    fontSize: 50,
    letterSpacing: 0.6,
    fontFamily: typography.family.semibold, 
  },

  subtitle: {
    marginTop: 8,
    textAlign: 'center',
    color: colors.muted,
    fontSize: 13,
    fontFamily: typography.family.regular,
    opacity: 0.9,
  },

  
  glow1: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 280,
    backgroundColor: colors.primary,
    opacity: 0.12,
    top: -100,
    left: -80,
  },

  glow2: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 300,
    backgroundColor: colors.primary2,
    opacity: 0.1,
    bottom: -130,
    right: -90,
  },
});
