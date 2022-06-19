import ErrorHandler from './ErrorHandler.mjs';

class Globals {
  constructor() {
    ErrorHandler.classCannotBeInstatiated();
  }

  static AUTO_STR = 'Auto';
  static AUDIO_STR = 'Audio only';
}

export default Globals;
