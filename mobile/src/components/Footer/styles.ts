import { fontFamily } from 'html2canvas/dist/types/css/property-descriptors/font-family';
import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  text: {
      fontSize: 12,
      color: theme.colors.text_secondary,
      fontFamily: theme.fonts.medium
  }
});