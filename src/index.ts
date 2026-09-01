import { Buffer } from "node:buffer";

const encoder = new TextEncoder();
const challenge = 'Basic realm="Orange Pekoe", charset="UTF-8"';
const legacyHostname = "orenge-pekoe.aether42.workers.dev";
const canonicalHostname = "orange-pekoe.aether42.workers.dev";
const sessionCookie = "orange_pekoe_session";
const sessionLifetime = 60 * 60 * 24 * 30;
const subtle = crypto.subtle as SubtleCrypto & {
  timingSafeEqual(a: ArrayBufferView, b: ArrayBufferView): boolean;
};

function timingSafeEqual(a: string, b: string): boolean {
  const aBytes = encoder.encode(a);
  const bBytes = encoder.encode(b);

  if (aBytes.byteLength !== bBytes.byteLength) return false;
  return subtle.timingSafeEqual(aBytes, bBytes);
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}

function loginPage(returnTo: string, error = ""): Response {
  const safeReturnTo = escapeHtml(returnTo);
  const errorMarkup = error
    ? `<p class="error" role="alert">${escapeHtml(error)}</p>`
    : "";

  return new Response(
    `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex,nofollow,noarchive,noimageindex">
    <title>Login | Orange Pekoe</title>
    <style>
      :root { color-scheme: dark; font-family: ui-serif, Georgia, "Yu Mincho", serif; }
      * { box-sizing: border-box; }
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 24px; color: #f4ead7; background: radial-gradient(circle at top, #264c3d, #0b211a 55%, #07140f); }
      main { width: min(100%, 430px); padding: 38px 32px; border: 1px solid #987748; border-radius: 14px; background: rgba(8, 28, 22, .94); box-shadow: 0 24px 70px rgba(0, 0, 0, .48); }
      .eyebrow { margin: 0 0 8px; color: #c8a96e; font: 600 12px/1.4 ui-sans-serif, system-ui, sans-serif; letter-spacing: .2em; text-transform: uppercase; }
      h1 { margin: 0 0 8px; font-size: clamp(30px, 8vw, 42px); font-weight: 500; }
      .lead { margin: 0 0 28px; color: #c8d2ca; font: 15px/1.7 ui-sans-serif, system-ui, sans-serif; }
      label { display: block; margin: 18px 0 7px; color: #e9deca; font: 600 13px/1.4 ui-sans-serif, system-ui, sans-serif; }
      input { width: 100%; min-height: 48px; padding: 11px 13px; border: 1px solid #5d7168; border-radius: 8px; color: #fff; background: #102d24; font: 16px/1.4 ui-sans-serif, system-ui, sans-serif; }
      input:focus { outline: 2px solid #c8a96e; outline-offset: 2px; }
      button { width: 100%; min-height: 49px; margin-top: 24px; border: 1px solid #d0ad6b; border-radius: 8px; color: #10261e; background: #d0ad6b; font: 700 15px/1 ui-sans-serif, system-ui, sans-serif; cursor: pointer; }
      button:hover { background: #e1c184; }
      .error { margin: 0 0 18px; padding: 11px 13px; border: 1px solid #bd685f; border-radius: 8px; color: #ffe4df; background: #4e201d; font: 14px/1.5 ui-sans-serif, system-ui, sans-serif; }
    </style>
  </head>
  <body>
    <main>
      <p class="eyebrow">Private archive</p>
      <h1>Orange Pekoe</h1>
      <p class="lead">IDとパスワードを入力してください。</p>
      ${errorMarkup}
      <form method="post" action="/login">
        <input type="hidden" name="returnTo" value="${safeReturnTo}">
        <label for="username">ID</label>
        <input id="username" name="username" autocomplete="username" required autofocus>
        <label for="password">パスワード</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required>
        <button type="submit">ログイン</button>
      </form>
    </main>
  </body>
</html>`,
    {
      status: error ? 401 : 200,
      headers: {
        "Cache-Control": "no-store",
        "Content-Security-Policy":
          "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
        "Content-Type": "text/html; charset=UTF-8",
        "Referrer-Policy": "no-referrer",
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex, nofollow, noarchive, noimageindex",
      },
    },
  );
}

function safeReturnPath(value: FormDataEntryValue | string | null): string {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }
  return value;
}

function readCookie(request: Request, name: string): string | null {
  const cookies = request.headers.get("Cookie");
  if (!cookies) return null;

  for (const cookie of cookies.split(";")) {
    const separator = cookie.indexOf("=");
    if (separator < 0) continue;
    if (cookie.slice(0, separator).trim() === name) {
      return cookie.slice(separator + 1).trim();
    }
  }
  return null;
}

async function sessionToken(env: Env): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(env.SITE_PASSWORD),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(`orange-pekoe-session-v1:${env.SITE_USERNAME}`),
  );
  return Buffer.from(signature).toString("base64url");
}

function readBasicCredentials(request: Request): [string, string] | null {
  const authorization = request.headers.get("Authorization");
  if (!authorization) return null;

  const [scheme, encoded, extra] = authorization.trim().split(/\s+/);
  if (scheme.toLowerCase() !== "basic" || !encoded || extra) return null;

  try {
    const decoded = Buffer.from(encoded, "base64").toString("utf8");
    const separator = decoded.indexOf(":");
    if (separator < 0) return null;
    return [decoded.slice(0, separator), decoded.slice(separator + 1)];
  } catch {
    return null;
  }
}

async function isAuthenticated(request: Request, env: Env): Promise<boolean> {
  const cookie = readCookie(request, sessionCookie);
  if (cookie && timingSafeEqual(cookie, await sessionToken(env))) return true;

  const credentials = readBasicCredentials(request);
  return Boolean(
    credentials &&
      timingSafeEqual(env.SITE_USERNAME, credentials[0]) &&
      timingSafeEqual(env.SITE_PASSWORD, credentials[1]),
  );
}

function basicUnauthorized(): Response {
  return new Response("ID or password is incorrect.", {
    status: 401,
    headers: {
      "Cache-Control": "no-store",
      "WWW-Authenticate": challenge,
      "X-Robots-Tag": "noindex, nofollow, noarchive, noimageindex",
    },
  });
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === legacyHostname) {
      url.hostname = canonicalHostname;
      return Response.redirect(url, 308);
    }

    if (url.pathname === "/login" || url.pathname === "/login/") {
      if (request.method === "POST") {
        const form = await request.formData();
        const username = form.get("username");
        const password = form.get("password");
        const returnTo = safeReturnPath(form.get("returnTo"));

        if (
          typeof username !== "string" ||
          typeof password !== "string" ||
          !timingSafeEqual(env.SITE_USERNAME, username) ||
          !timingSafeEqual(env.SITE_PASSWORD, password)
        ) {
          return loginPage(returnTo, "IDまたはパスワードが違います。");
        }

        return new Response(null, {
          status: 303,
          headers: {
            "Cache-Control": "no-store",
            Location: returnTo,
            "Set-Cookie": `${sessionCookie}=${await sessionToken(env)}; Path=/; Max-Age=${sessionLifetime}; HttpOnly; Secure; SameSite=Strict`,
          },
        });
      }
      return loginPage(safeReturnPath(url.searchParams.get("returnTo")));
    }

    if (url.pathname === "/logout" || url.pathname === "/logout/") {
      return new Response(null, {
        status: 303,
        headers: {
          "Cache-Control": "no-store",
          Location: "/login",
          "Set-Cookie": `${sessionCookie}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`,
        },
      });
    }

    if (!(await isAuthenticated(request, env))) {
      if (request.headers.get("Accept")?.includes("text/html")) {
        const loginUrl = new URL("/login", url);
        loginUrl.searchParams.set("returnTo", `${url.pathname}${url.search}`);
        return Response.redirect(loginUrl, 302);
      }
      return basicUnauthorized();
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
