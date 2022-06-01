import { EmailOptions } from '@/usecases/send-email/posts/email-service'

const attachmentFilePath = '../../resources/text.txt'
const fromName = 'Gustavo Delfim'
const fromEmail = 'gusttavodelfim@gmail.com'
const toName = 'Nome Teste'
const toEmail = 'teste@email.com'
const subject = 'Mensagem de teste'
const emailbody = 'Texto da mensagem'
const emailBodyHtml = '<b>Texto da mensagem</b>'
const attachments = [{
  filename: attachmentFilePath,
  contentType: 'text/plain'
}]

export function getEmailOptions (): EmailOptions {
  return {
    host: process.env.EMAIL_HOST || '',
    port: Number(process.env.EMAIL_PORT) || 867,
    username: process.env.EMAIL_USERNAME || '',
    password: process.env.EMAIL_PASSWORD || '',
    from: `${fromName} ${fromEmail}`,
    to: `${toName} <${toEmail}>`,
    subject,
    text: emailbody,
    html: emailBodyHtml,
    attachments
  }
}
