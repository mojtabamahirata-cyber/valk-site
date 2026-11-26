#!/usr/bin/env python3
"""يولّد privacy.html و terms.html من bot/legal_content.py (مصدر واحد مع البوت).
الاستخدام (من مجلد الموقع):  python3 tools/build_legal.py ../bot
"""
import html
import importlib.util
import os
import sys

bot_dir = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else "../bot")
spec = importlib.util.spec_from_file_location("legal_content", os.path.join(bot_dir, "legal_content.py"))
L = importlib.util.module_from_spec(spec)
spec.loader.exec_module(L)
site = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

E = html.escape


def body(doc):
    out = [f'<p style="line-height:1.9">{E(doc["intro"])}</p>']
    for head, paras in doc["sections"]:
        out.append(f'<h2 style="font-size:22px;margin-top:28px">{E(head)}</h2>')
        bullets = []
        for p in paras + [None]:
            if p is not None and p.startswith("• "):
                bullets.append(p[2:])
                continue
            if bullets:
                out.append('<ul style="line-height:1.9;padding-inline-start:22px">' + "".join(f"<li>{E(b)}</li>" for b in bullets) + "</ul>")
                bullets = []
            if p is not None:
                out.append(f'<p style="line-height:1.9">{E(p)}</p>')
    return "\n  ".join(out)


def page(doc, other_href, other_label, filename):
    return f'''<!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{E(doc["title"])} — {E(L.BOT)}</title><link rel="icon" href="assets/logo.svg">
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css"></head>
<body data-page="legal"><header id="nav"></header>
<main><div class="wrap" style="padding-top:40px;padding-bottom:50px;max-width:820px">
  <div class="sec-h"><small>قانوني</small><h2>{E(doc["title"])}</h2><p>آخر تحديث: {E(L.UPDATED)}</p></div>
  {body(doc)}
  <h2 style="font-size:22px;margin-top:28px">التواصل</h2>
  <p style="line-height:1.9">لأي سؤال أو طلب حذف بيانات تواصل معنا من سيرفر الدعم.</p>
  <div class="cta" style="justify-content:flex-start;margin-top:14px"><span data-link="supportUrl" data-label="سيرفر الدعم"></span><a class="btn ghost" href="{other_href}">{other_label}</a></div>
</div></main>
<footer id="foot"></footer>
<script src="js/config.js"></script><script src="js/app.js"></script></body></html>
'''


for doc, name, other in ((L.PRIVACY, "privacy.html", ("terms.html", "شروط الخدمة")), (L.TERMS, "terms.html", ("privacy.html", "سياسة الخصوصية"))):
    with open(os.path.join(site, name), "w", encoding="utf-8") as f:
        f.write(page(doc, other[0], other[1], name))
    print("wrote", name)
