#!/usr/bin/env bash
# 安装每周五 14:45–14:49 的铃声提醒（共 5 次，每分钟一次）
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REMIND_SCRIPT="${SCRIPT_DIR}/remind.sh"
TIMEZONE="${FRIDAY_REMINDER_TZ:-Asia/Shanghai}"

chmod +x "$REMIND_SCRIPT"

MARKER="# friday-reminder-559a"
CRON_LINES=$(cat <<EOF
${MARKER}
CRON_TZ=${TIMEZONE}
45 14 * * 5 ${REMIND_SCRIPT} "周五提醒 (1/5)"
46 14 * * 5 ${REMIND_SCRIPT} "周五提醒 (2/5)"
47 14 * * 5 ${REMIND_SCRIPT} "周五提醒 (3/5)"
48 14 * * 5 ${REMIND_SCRIPT} "周五提醒 (4/5)"
49 14 * * 5 ${REMIND_SCRIPT} "周五提醒 (5/5)"
EOF
)

# 保留已有 crontab，仅替换本提醒相关条目
EXISTING="$(crontab -l 2>/dev/null | grep -v "$MARKER" | grep -v "friday-reminder" | grep -v "^CRON_TZ=${TIMEZONE}$" || true)"
{
  [ -n "$EXISTING" ] && printf '%s\n' "$EXISTING"
  printf '%s\n' "$CRON_LINES"
} | crontab -

echo "已安装周五铃声提醒："
echo "  时区: ${TIMEZONE}"
echo "  时间: 每周五 14:45 – 14:49（每分钟 1 次，共 5 次）"
echo ""
echo "当前 crontab："
crontab -l | grep -A6 "$MARKER"
