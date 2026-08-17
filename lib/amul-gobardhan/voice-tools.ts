export type ToolResult = { ok: boolean } & Record<string, unknown>;
export type ToolHandlers = Record<string, (args: Record<string, unknown>) => Promise<ToolResult>>;

/** Only tool on this Live socket. No booth, form-fill, or write tools. */
export const VOICE_TOOL_DECLARATIONS = [
  {
    name: 'end_conversation',
    description:
      'End the voice session because the farmer said they are done, said goodbye, or asked to stop.',
    parameters: { type: 'object', properties: {} },
  },
];
