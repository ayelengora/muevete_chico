import type { StaticImageData } from "next/image";
import aMedida from "@/images/covers/a-medida.jpg";
import andalucia from "@/images/covers/andalucia.jpg";
import blogMalaga from "@/images/covers/blog-malaga.jpg";
import blogNerja from "@/images/covers/blog-nerja.jpg";
import blogRecursos from "@/images/covers/blog-recursos.jpg";
import blogTips from "@/images/covers/blog-tips.jpg";
import lisboa from "@/images/covers/lisboa.jpg";
import malaga from "@/images/covers/malaga.jpg";
import marrakech from "@/images/covers/marrakech.jpg";
import nerja from "@/images/covers/nerja.jpg";
import puglia from "@/images/covers/puglia.jpg";

const files: Record<string, StaticImageData> = {
  "a-medida": aMedida,
  andalucia,
  "blog-malaga": blogMalaga,
  "blog-nerja": blogNerja,
  "blog-recursos": blogRecursos,
  "blog-tips": blogTips,
  lisboa,
  malaga,
  marrakech,
  nerja,
  puglia,
};

function fileKey(url: string) {
  const path = url.split("?")[0] || "";
  const name = path.split("/").pop() || "";
  return name.replace(/\.[^.]+$/, "");
}

export function coverSrc(url?: string | null, fallback: StaticImageData = malaga) {
  if (!url) return fallback.src;
  const local = files[fileKey(url)];
  if (local) return local.src;
  if (url.startsWith("http")) return fallback.src;
  return url;
}

export const malagaCover = malaga.src;
