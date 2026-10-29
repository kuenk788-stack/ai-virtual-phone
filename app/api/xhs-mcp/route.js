import handler from './2.0.风控解决，配上card解析成功 (1).mjs';

export const runtime = 'nodejs';

export async function GET(request) {
  const url = new URL(request.url);

  if (!url.searchParams.has('resolve_share') &&
      !url.searchParams.has('img')) {
    return Response.json({
      status: 'ok',
      message: 'MCP route ready'
    });
  }

  return Response.json(
    { error: 'Card endpoint not enabled yet' },
    { status: 403 }
  );
}

export async function POST(request) {
  const key = process.env.MCP_KEY;

  if (!key) {
    return Response.json(
      { error: 'MCP_KEY not configured' },
      { status: 503 }
    );
  }

  const auth = request.headers.get('authorization');

  if (auth !== `Bearer ${key}`) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return handler(request, {});
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Authorization, Content-Type'
    }
  });
}
