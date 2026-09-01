import { Buffer } from "node:buffer";

const encoder = new TextEncoder();
const challenge = 'Basic realm="Orange Pekoe", charset="UTF-8"';
const subtle = crypto.subtle as SubtleCrypto & {
  timingSafeEqual(a: ArrayBufferView, b: ArrayBufferView): boolean;
};

function timingSafeEqual(a: string, b: string): boolean {
  const aBytes = encoder.encode(a);
  const bBytes = encoder.encode(b);

  if (aBytes.byteLength !== bBytes.byteLength) {
    return !subtle.timingSafeEqual(aBytes, aBytes);
  }

  return subtle.timingSafeEqual(aBytes, bBytes);
}

function unauthorized(): Response {
  return new Response("ID or password is incorrect.", {
    status: 401,
    headers: {
      "Cache-Control": "no-store",
      "WWW-Authenticate": challenge,
    },
  });
}

function readCredentials(request: Request): [string, string] | null {
  const authorization = request.headers.get("Authorization");
  if (!authorization) {
    return null;
  }

  const [scheme, encoded, extra] = authorization.trim().split(/\s+/);
  if (scheme.toLowerCase() !== "basic" || !encoded || extra) {
    return null;
  }

  try {
    const decoded = Buffer.from(encoded, "base64").toString("utf8");
    const separator = decoded.indexOf(":");
    if (separator < 0) {
      return null;
    }

    return [decoded.slice(0, separator), decoded.slice(separator + 1)];
  } catch {
    return null;
  }
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/logout" || url.pathname === "/logout/") {
      return new Response("Logged out.", {
        status: 401,
        headers: { "Cache-Control": "no-store" },
      });
    }

    const credentials = readCredentials(request);
    if (
      !credentials ||
      !timingSafeEqual(env.SITE_USERNAME, credentials[0]) ||
      !timingSafeEqual(env.SITE_PASSWORD, credentials[1])
    ) {
      return unauthorized();
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
