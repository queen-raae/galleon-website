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

  let description = `Your email is ${payload?.email} and your unique identifier (uid) is ${payload?.sub}.
  You are ${!payload?.["outseta:isPrimary"] ? "not" : ""} the primary person for the account with uid ${payload?.["outseta:accountUid"]}.`;

  const addOns = payload?.["outseta:addOnUids"] as string;
  if (addOns) {
    description += ` You have the following add-ons: ${addOns}.`;
  }

  // Respond
  return new Response(
    JSON.stringify({
      greeting: `Hello ${payload?.name || "Pirate"}`,
      description: description,
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
