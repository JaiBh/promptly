import { SANDBOX_TIMEOUT } from "@/types";
import { Sandbox } from "@e2b/code-interpreter";

export async function getSandbox(sandboxId: string) {
  const sandbox = await Sandbox.connect(sandboxId);
  await sandbox.setTimeout(SANDBOX_TIMEOUT);
  return sandbox;
}
