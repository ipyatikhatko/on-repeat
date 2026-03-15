import {
  Outfit,
  Rubik_80s_Fade,
  Rubik_Glitch,
  Rubik_Mono_One,
} from "next/font/google";

const outfit = Outfit({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const rubik80s = Rubik_80s_Fade({ weight: ["400"], subsets: ["latin"] });
const rubikGlitch = Rubik_Glitch({ weight: ["400"], subsets: ["latin"] });
const rubikMono = Rubik_Mono_One({ weight: ["400"], subsets: ["latin"] });

export { outfit, rubik80s, rubikGlitch, rubikMono };
