class ErrorHandler {
  static handle(error) {
    throw new Error(error);
  }

  static classCannotBeInstatiated() {
    throw new Error('This class cannot be instantiated');
  }

  static baseClassCannotBeInstatiated() {
    throw new Error('This base class cannot be instantiated');
  }
}

export default ErrorHandler;
