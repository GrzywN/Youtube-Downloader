/* eslint-disable lines-between-class-members */
import ErrorHandler from './ErrorHandler.js';

class Globals {
  constructor() {
    ErrorHandler.classCannotBeInstatiated();
  }

  static VIDEO_AUDIO_STR = 'Video & Audio';
  static AUDIO_STR = 'Audio only';
}

export default Globals;
