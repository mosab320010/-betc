from typing import Dict


def summarize(text: str) -> Dict[str, str]:
    return {"summary": text[:120]}
