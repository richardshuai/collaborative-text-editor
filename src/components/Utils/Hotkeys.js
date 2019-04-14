import { isKeyHotkey } from "is-hotkey";

const Hotkeys = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underlined",
  "mod+shift+7": "numbered-list",
  "mod+shift+8": "bulleted-list",
  "mod+k": "link",
  "mod+1": "comment"
};

export function findMarkHotkey(event) {
  const hotkeyProps = { containsKey: false, type: "none" };
  for (const hotkey of Object.keys(Hotkeys)) {
    if (isKeyHotkey(hotkey)(event)) {
      hotkeyProps.containsKey = true;
      hotkeyProps.type = Hotkeys[hotkey];
    }
  }
  return hotkeyProps;
}
