#!/usr/bin/env bash
# 每周五下午铃声提醒（单次）
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RINGTONE="${SCRIPT_DIR}/ringtone.wav"
MESSAGE="${1:-周五提醒：该休息一下啦！}"

play_sound() {
  if command -v paplay >/dev/null 2>&1; then
    paplay "$RINGTONE" 2>/dev/null || true
  elif command -v aplay >/dev/null 2>&1; then
    aplay -q "$RINGTONE" 2>/dev/null || true
  elif command -v ffplay >/dev/null 2>&1; then
    ffplay -nodisp -autoexit -loglevel quiet "$RINGTONE" 2>/dev/null || true
  fi
}

show_notification() {
  if command -v notify-send >/dev/null 2>&1; then
    notify-send -u critical "周五提醒" "$MESSAGE" 2>/dev/null || true
  fi
}

# 连续响铃 3 次，间隔 0.5 秒
for _ in 1 2 3; do
  play_sound
  sleep 0.5
done

show_notification
echo "[$(date '+%Y-%m-%d %H:%M:%S %Z')] $MESSAGE"
