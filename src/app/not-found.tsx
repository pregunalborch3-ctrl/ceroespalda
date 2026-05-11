import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">
        Error 404
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
        Esta página no existe
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
        Puede que el enlace esté roto o que el contenido haya cambiado de sitio.
        Prueba a volver al inicio o explora el blog.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">Volver al inicio</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/blog">Ir al blog</Link>
        </Button>
      </div>
    </Container>
  );
}
