export class Email {
  static validate (email: string): boolean {
    if (!email) {
      return false
    }
    if (email.length > 320) {
      return false
    }
    const [local, domain] = email.split('@')
    if (local.length > 64) {
      return false
    }
    if (domain.length > 255) {
      return false
    }
    if (!local) {
      return false
    }
    if (!domain) {
      return false
    }

    const [host, region] = domain.split('.')
    if (!region) {
      return false
    }
    if ([host, region].some(part => part.length > 63)) {
      return false
    }

    const emailRegex = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

    if (!emailRegex.test(email)) {
      return false
    }

    return true
  }
}
