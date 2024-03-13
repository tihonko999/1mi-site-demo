import axios from "axios";

export default function error(e: unknown, showError = false): void {
  // canceling the request is not a error
  if (axios.isCancel(e)) return;
  console.error(e);
  if (showError) alert(e);
}
