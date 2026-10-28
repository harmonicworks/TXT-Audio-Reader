#!/bin/bash
# Starts TXT Audio Reader: a tiny local web server for this folder, then opens it in your browser.
# Keep this window open while you use it. Close it (or press Ctrl+C) to stop.
cd "$(dirname "$0")"
PORT=8765
if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 was not found. Python 3 is needed: on a Mac, run 'xcode-select --install' in Terminal."
  read -n 1 -s -r -p "Press any key to close."
  exit 1
fi
echo "TXT Audio Reader is running at http://localhost:$PORT"
echo "Leave this window open while you use it. Close it to stop."
( sleep 1; open "http://localhost:$PORT/index.html" ) &
python3 -m http.server $PORT --bind 127.0.0.1
