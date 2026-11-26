# -*- coding: utf-8 -*-
"""يولّد js/updates.js من سجل التحديثات داخل البوت (bot_updates.py).
التشغيل:  python3 tools/build_updates.py ../مسار_مجلد_البوت
(الموقع ما يعرض dev_notes — هذي للمطوّر فقط.)"""
import json, os, sys, types
bot_dir = sys.argv[1] if len(sys.argv) > 1 else ".."
for m in ("httpx", "websockets", "dotenv"):          # bot_updates يستورد zrzur_compat اللي يحتاج مكتبات ما نحتاجها هنا
    sys.modules.setdefault(m, types.ModuleType(m))
sys.modules["dotenv"].load_dotenv = lambda *a, **k: None
sys.path.insert(0, bot_dir)
import bot_updates
data = [{k: u.get(k) for k in ("version", "date", "title", "items")} for u in bot_updates.UPDATES]
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "js", "updates.js")
with open(out, "w", encoding="utf-8") as f:
    f.write("/* مولَّد تلقائياً من bot_updates.py — لا تعدّله يدوياً */\nwindow.VALK_UPDATES = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n")
print("updates:", len(data), "->", out)
