import { actionCreator } from '../../utils/actionCreator';

export const ReviewContainer = `ReviewProvider`;

export const REVIEW_ACTIONS = {
  ...actionCreator('LIST', ReviewContainer),
};

export const ThemeContainer = `ThemeProvider`;

export const THEME_ACTIONS = {
  ...actionCreator('LIST', ThemeContainer),
  ...actionCreator('GET', ThemeContainer),
};
