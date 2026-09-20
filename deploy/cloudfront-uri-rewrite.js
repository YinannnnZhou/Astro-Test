function handler(event) {
  var request = event.request;
  if (request.uri === '/products/360-feedback' || request.uri === '/products/360-feedback/') {
    request.uri = '/products/360-feedback/index.html';
  }
  return request;
}
