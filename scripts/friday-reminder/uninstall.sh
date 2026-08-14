#!/usr/bin/env bash
# 卸载周五铃声提醒
set -euo pipefail

MARKER="# friday-reminder-559a"
TIMEZONE="${FRIDAY_REMINDER_TZ:-Asia/Shanghai}"

EXISTING="$(crontab -l 2>/dev/null || true)"
if [ -z "$EXISTING" ]; then
  echo "没有已安装的 crontab 任务。"
  exit 0
fi

FILTERED="$(printf '%s\n' "$EXISTING" | grep -v "$MARKER" | grep -v "friday-reminder" | grep -v "^CRON_TZ=${TIMEZONE}$" || true)"
if [ -n "$FILTERED" ]; then
  printf '%s\n' "$FILTERED" | crontab -
else
  crontab -r 2>/dev/null || true
fi

echo "已卸载周五铃声提醒。"
