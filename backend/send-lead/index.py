import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime


def handler(event: dict, context) -> dict:
    """Отправка заявок с лендинга на email"""
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Метод не поддерживается'})
        }
    
    data = json.loads(event.get('body', '{}'))
    
    name = data.get('name', '')
    phone = data.get('phone', '')
    niche = data.get('niche', '')
    problems = data.get('problems', [])
    
    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и телефон обязательны'})
        }
    
    smtp_host = os.environ.get('SMTP_HOST', '')
    smtp_port_str = os.environ.get('SMTP_PORT', '587')
    smtp_user = os.environ.get('SMTP_USER', '')
    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    recipient = os.environ.get('RECIPIENT_EMAIL', '')
    
    if not all([smtp_host, smtp_user, smtp_password, recipient]):
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Заявка сохранена (email не настроен)',
                'data': {'name': name, 'phone': phone, 'niche': niche}
            })
        }
    
    smtp_port = int(smtp_port_str)
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с лендинга: {name}'
    msg['From'] = smtp_user
    msg['To'] = recipient
    
    problems_list = '\n'.join([f'• {p}' for p in problems]) if problems else 'Не указаны'
    
    html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #2ecc71; border-bottom: 2px solid #2ecc71; padding-bottom: 10px;">
            🚀 Новая заявка с лендинга
          </h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>👤 Имя:</strong> {name}</p>
            <p><strong>📞 Телефон:</strong> {phone}</p>
            <p><strong>🏢 Ниша:</strong> {niche or 'Не указана'}</p>
            
            <div style="margin-top: 20px;">
              <strong>⚠️ Отмеченные проблемы:</strong>
              <div style="margin-top: 10px; padding: 15px; background: #f0f0f0; border-radius: 5px;">
                {problems_list.replace(chr(10), '<br>')}
              </div>
            </div>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 20px;">
            Заявка получена: {datetime.now().strftime('%d.%m.%Y в %H:%M')}
          </p>
        </div>
      </body>
    </html>
    """
    
    msg.attach(MIMEText(html, 'html'))
    
    try:
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'message': 'Заявка отправлена'})
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Ошибка отправки: {str(e)}'})
        }