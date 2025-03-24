import type { APIRoute } from "astro";
import { jwtVerify, createRemoteJWKSet, decodeJwt } from "jose";

export const prerender = false;

const verifyToken = async (token: string | undefined) => {
  if (!token) {
    return null;
  }

  try {
    const decoded = decodeJwt(token);

    // Fetch the JSON Web Key (JWK) set
    const JWKS = createRemoteJWKSet(
      // ❕ Exchange for your outseta url
      new URL(`${decoded.iss}/.well-known/jwks`),
    );

    // Use the JSON Web Key (JWK) to verify the token
    const { payload } = await jwtVerify(token, JWKS);

    // Respond
    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const GET: APIRoute = async ({ request }) => {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  // Verify the token
  const payload = await verifyToken(token);

  if (!payload) {
    return new Response(
      JSON.stringify({
        error: "Unauthorized",
      }),
      {
        headers,
        status: 401,
      },
    );
  }

  // Respond
  return new Response(
    JSON.stringify({
      greeting: `Hello ${payload?.name || "Pirate"}`,
      name: payload?.name,
      email: payload?.email,
      personUid: payload?.sub,
      accountUid: payload?.["outseta:accountUid"],
      planUid: payload?.["outseta:planUid"],
      isPrimary: payload?.["outseta:isPrimary"],
      addOnUids: payload?.["outseta:addOnUids"],
    }),
    {
      headers,
    },
  );
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    headers,
    status: 204,
  });
};
