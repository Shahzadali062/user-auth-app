import { StyleSheet } from 'react-native';
import { colors } from '../../ui/theme/colors';
import { typography } from '../../ui/theme/typography';

export const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 30,
  },

  centerX: {
    width: '100%',
    alignItems: 'center',
  },

  centerWhenClosed: {
    justifyContent: 'center',
  },

  wrap: {
    width: '100%',
    paddingHorizontal: 18,
    alignItems: 'center',
  },

  
  container: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
  },

  // Brand
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  brandIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  brandTitle: {
    color: colors.text,
    fontSize: 16,
    fontFamily: typography.family.semibold,
    letterSpacing: 0.4,
  },

  headline: {
    color: colors.text,
    fontSize: 28,
    fontFamily: typography.family.bold,
    letterSpacing: 0.2,
    marginBottom: 6,
  },

  subHeadline: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: typography.family.regular,
    marginBottom: 18,
  },

  card: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
  },

  formError: {
    color: colors.danger,
    marginBottom: 10,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: typography.family.medium,
  },

  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },

  leftIcon: {
    marginTop: 28,
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  linkText: {
    color: colors.muted,
    marginTop: 14,
    textAlign: 'center',
    fontSize: 13,
    fontFamily: typography.family.regular,
  },

  link: {
    color: colors.primary,
    fontFamily: typography.family.bold,
  },

  footerHint: {
    marginTop: 14,
    textAlign: 'center',
    color: colors.muted,
    fontSize: 12,
    fontFamily: typography.family.regular,
    opacity: 0.85,
  },

  glow1: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 240,
    backgroundColor: colors.primary,
    opacity: 0.12,
    top: -80,
    left: -60,
  },

  glow2: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 260,
    backgroundColor: colors.primary2,
    opacity: 0.1,
    bottom: -120,
    right: -80,
  },
});
