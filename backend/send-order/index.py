"""
Отправка заявки с сайта кондитерской на email chekushkina92@mail.ru
"""
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    message = body.get("message", "").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "Имя и телефон обязательны"}),
        }

    smtp_password = os.environ["SMTP_PASSWORD"]
    from_email = "chekushkina92@mail.ru"
    to_email = "chekushkina92@mail.ru"

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"🎂 Новая заявка с сайта — {name}"
    msg["From"] = from_email
    msg["To"] = to_email

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff8f5; padding: 30px; border-radius: 16px;">
      <h2 style="color: #d94f7a; margin-bottom: 24px; font-size: 22px;">🎂 Новая заявка с сайта</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; color: #888; font-size: 14px; width: 140px;">Имя</td>
          <td style="padding: 10px 0; font-weight: 600; font-size: 16px; color: #222;">{name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888; font-size: 14px;">Телефон / мессенджер</td>
          <td style="padding: 10px 0; font-weight: 600; font-size: 16px; color: #222;">{phone}</td>
        </tr>
        {"<tr><td style='padding: 10px 0; color: #888; font-size: 14px; vertical-align: top;'>Пожелания</td><td style='padding: 10px 0; font-size: 15px; color: #444; line-height: 1.6;'>" + message + "</td></tr>" if message else ""}
      </table>
      <div style="margin-top: 28px; padding: 16px; background: #fce4ed; border-radius: 10px; font-size: 13px; color: #c2446b;">
        Ответьте клиенту в течение дня — это повышает вероятность заказа 🍰
      </div>
    </div>
    """

    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP_SSL("smtp.mail.ru", 465) as server:
        server.login(from_email, smtp_password)
        server.sendmail(from_email, to_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True}),
    }
