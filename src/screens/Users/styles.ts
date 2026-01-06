import { StyleSheet } from 'react-native';
import { colors } from '../../ui/theme/colors';
import { typography } from '../../ui/theme/typography';

export const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'flex-start', // ✅ important: allows content to take full height
    paddingTop: 18,
    paddingBottom: 18,
  },

  container: {
    flex: 1, // ✅ important: gives list area height
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 12,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: colors.text,
    fontSize: 22,
    fontFamily: typography.family.bold,
  },

  subtitle: {
    marginTop: 2,
    color: colors.muted,
    fontSize: 13,
    fontFamily: typography.family.regular,
  },

  card: {
    flex: 1, // ✅ important: takes remaining height -> FlatList can scroll
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    overflow: 'hidden',
  },

  listContent: {
    paddingBottom: 10,
  },

  emptyText: {
    color: colors.muted,
    fontSize: 13,
    fontFamily: typography.family.regular,
    textAlign: 'center',
    marginTop: 10,
  },

  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },

  userIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },

  userName: {
    color: colors.text,
    fontSize: 16,
    fontFamily: typography.family.semibold,
    marginBottom: 2,
  },

  userMeta: {
    color: colors.muted,
    fontSize: 13,
    fontFamily: typography.family.regular,
    lineHeight: 18,
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
