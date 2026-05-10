/**
 * Локальный mock для ESTIMATE_WEBHOOK_URL в e2e (без внешних сервисов).
 */
import http from "node:http";

const port = Number(process.env.WEBHOOK_MOCK_PORT ?? "18080");
const host = "127.0.0.1";

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("ok");
    return;
  }

  if (req.method === "POST" && req.url === "/hook") {
    req.on("data", () => {});
    req.on("end", () => {
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ ok: true }));
    });
    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(port, host, () => {
  process.stderr.write(`[webhook-mock] http://${host}:${port}\n`);
});
