#!/usr/bin/env python3
"""Extrae título, descripción y transcripción de los vídeos de YouTube listados en un fichero."""
import re
import sys
import subprocess
import urllib.request


def ensure_transcript_api():
    try:
        import youtube_transcript_api  # noqa: F401
    except ImportError:
        subprocess.check_call(
            [sys.executable, "-m", "pip", "install", "--user", "-q", "youtube-transcript-api"]
        )


def parse_input_file(path):
    entries = []
    with open(path, encoding="utf-8", errors="ignore") as f:
        for raw in f:
            line = raw.strip()
            if not line:
                continue
            m = re.search(
                r"(?:https?://)?(?:www\.)?(?:youtube\.com/watch\?v=|youtu\.be/)([A-Za-z0-9_-]{11})",
                line,
            )
            if not m:
                continue
            vid = m.group(1)
            url = f"https://www.youtube.com/watch?v={vid}"
            prefix = line[: m.start()].strip().lstrip("-*•").strip().rstrip(":").strip()
            entries.append((prefix, vid, url))
    return entries


def fetch_meta(vid):
    url = f"https://www.youtube.com/watch?v={vid}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "ignore")

    def grab(pattern):
        m = re.search(pattern, html)
        if not m:
            return ""
        return m.group(1).replace("\\n", "\n").replace('\\"', '"').replace("\\u0026", "&")

    title = grab(r'"videoDetails":\{.*?"title":"((?:\\.|[^"])*)"')
    desc = grab(r'"shortDescription":"((?:\\.|[^"])*)"')
    return title, desc


def fetch_transcript(vid):
    from youtube_transcript_api import YouTubeTranscriptApi

    api = YouTubeTranscriptApi()
    try:
        t = api.fetch(vid, languages=["es", "en"])
    except Exception:
        tlist = api.list(vid)
        first = next(iter(tlist))
        t = first.fetch()
    text = " ".join(s.text for s in t)
    return " ".join(text.split())


def main():
    if len(sys.argv) < 2:
        print("Uso: extraer_youtube.py <fichero_con_links>", file=sys.stderr)
        sys.exit(1)

    ensure_transcript_api()
    entries = parse_input_file(sys.argv[1])
    if not entries:
        print("No se encontraron enlaces de YouTube en el fichero.", file=sys.stderr)
        sys.exit(2)

    for idx, (label, vid, url) in enumerate(entries, 1):
        print(f"=== VIDEO {idx} ===")
        print(f"Nombre en lista: {label or '(sin nombre)'}")
        print(f"URL: {url}")
        try:
            title, desc = fetch_meta(vid)
            print(f"Título en YouTube: {title}")
            print(f"Descripción:\n{desc.strip()}\n")
        except Exception as e:
            print(f"Error al obtener metadatos: {e}")
        try:
            tx = fetch_transcript(vid)
            print(f"Transcripción:\n{tx}\n")
        except Exception as e:
            print(f"Transcripción: [NO DISPONIBLE: {e}]\n")


if __name__ == "__main__":
    main()
