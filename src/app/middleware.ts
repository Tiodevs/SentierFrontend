import { NextRequest, NextResponse } from "next/server";
import { getCookiesServer } from "@/lib/cookieServer";
import { api } from "./services/api";

// Regex para detectar UUID na rota dinâmica
const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Permitir arquivos estáticos e a rota home
  if (pathname.startsWith("/_next") || pathname === "/") {
    return NextResponse.next();
  }

  const token = getCookiesServer();

  // Permitir rotas dinâmicas de projeto (/project/[id]) sem autenticação
  if (pathname.startsWith("/project/")) {
    const id = pathname.split("/")[2];
    if (uuidPattern.test(id)) {
      return NextResponse.next(); // Permite o acesso se for um UUID válido
    }
  }

  // Proteger rotas específicas
  const protectedPaths = ["/course", "/adm"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    const isValid = await validateToken(token);
    if (!isValid) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next(); // Permitir acesso para outras rotas
}

async function validateToken(token: string) {
  if (!token) return false;

  try {
    await api.get("/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch (err) {
    console.log("Erro do token:", err);
    return false;
  }
}
