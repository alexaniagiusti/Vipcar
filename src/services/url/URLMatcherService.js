class UrlMatcherService {
  self (model, type) {
    return model.links.find(link => link.type === type).uri
  }
}

export default UrlMatcherService
