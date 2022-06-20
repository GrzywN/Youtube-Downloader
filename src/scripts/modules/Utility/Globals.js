/* eslint-disable lines-between-class-members */
import ErrorHandler from './ErrorHandler.js';

class Globals {
  constructor() {
    ErrorHandler.classCannotBeInstatiated();
  }

  static AUTO_STR = 'Auto';
  static AUDIO_STR = 'Audio only';
}

export default Globals;
