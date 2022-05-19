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
    if (host.length > 63) {
      return false
    }
    if (region.length > 63) {
      return false
    }
    return true
  }
}
