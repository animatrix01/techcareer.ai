import {
  siGooglechrome,
  siApple,
  siTesla,
  siStripe,
  siMeta,
  siNetflix,
  siNotion,
  siSpotify,
  siGithub,
  siAirbnb,
  siFigma,
  siLinear,
} from "simple-icons";

function SimpleIcon({
  icon,
  color,
  className = "w-5 h-5",
}: {
  icon: { path: string };
  color: string;
  className?: string;
}) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={icon.path} />
    </svg>
  );
}

export function GoogleLogo() {
  return (
    <div className="flex items-center gap-2 h-10">
      <SimpleIcon icon={siGooglechrome} color="#4285F4" className="w-5 h-5" />
      <span className="text-xl font-medium text-ink/50 whitespace-nowrap">Google</span>
    </div>
  );
}

export function AppleLogo() {
  return (
    <div className="flex items-center gap-2 h-10">
      <SimpleIcon icon={siApple} color="#000000" className="w-5 h-5" />
      <span className="text-xl font-semibold text-ink/50 whitespace-nowrap">Apple</span>
    </div>
  );
}

export function TeslaLogo() {
  return (
    <div className="flex items-center gap-2 h-10">
      <SimpleIcon icon={siTesla} color="#CC0000" className="w-5 h-5" />
      <span className="text-xl font-semibold text-ink/50 whitespace-nowrap">Tesla</span>
    </div>
  );
}

export function StripeLogo() {
  return (
    <div className="flex items-center gap-2 h-10">
      <SimpleIcon icon={siStripe} color="#635BFF" className="w-5 h-5" />
      <span className="text-xl font-medium text-ink/50 whitespace-nowrap">Stripe</span>
    </div>
  );
}

export function MetaLogo() {
  return (
    <div className="flex items-center gap-2 h-10">
      <SimpleIcon icon={siMeta} color="#0082FB" className="w-5 h-5" />
      <span className="text-xl font-bold text-ink/50 whitespace-nowrap">Meta</span>
    </div>
  );
}

export function NetflixLogo() {
  return (
    <div className="flex items-center gap-2 h-10">
      <SimpleIcon icon={siNetflix} color="#E50914" className="w-5 h-5" />
      <span className="text-xl font-bold text-ink/50 whitespace-nowrap">Netflix</span>
    </div>
  );
}

export function NotionLogo() {
  return (
    <div className="flex items-center gap-2 h-10">
      <SimpleIcon icon={siNotion} color="#000000" className="w-5 h-5" />
      <span className="text-xl font-semibold text-ink/50 whitespace-nowrap">Notion</span>
    </div>
  );
}

export function SpotifyLogo() {
  return (
    <div className="flex items-center gap-2 h-10">
      <SimpleIcon icon={siSpotify} color="#1ED760" className="w-5 h-5" />
      <span className="text-xl font-bold text-ink/50 whitespace-nowrap">Spotify</span>
    </div>
  );
}

export function GitHubLogo() {
  return (
    <div className="flex items-center gap-2 h-10">
      <SimpleIcon icon={siGithub} color="#181717" className="w-5 h-5" />
      <span className="text-xl font-semibold text-ink/50 whitespace-nowrap">GitHub</span>
    </div>
  );
}

export function AirbnbLogo() {
  return (
    <div className="flex items-center gap-2 h-10">
      <SimpleIcon icon={siAirbnb} color="#FF5A5F" className="w-5 h-5" />
      <span className="text-xl font-semibold text-ink/50 whitespace-nowrap">Airbnb</span>
    </div>
  );
}

export function FigmaLogo() {
  return (
    <div className="flex items-center gap-2 h-10">
      <SimpleIcon icon={siFigma} color="#F24E1E" className="w-5 h-5" />
      <span className="text-xl font-medium text-ink/50 whitespace-nowrap">Figma</span>
    </div>
  );
}

export function LinearLogo() {
  return (
    <div className="flex items-center gap-2 h-10">
      <SimpleIcon icon={siLinear} color="#5E6AD2" className="w-5 h-5" />
      <span className="text-xl font-medium text-ink/50 whitespace-nowrap">Linear</span>
    </div>
  );
}

export const BRAND_LOGOS = {
  Google: GoogleLogo,
  Apple: AppleLogo,
  Tesla: TeslaLogo,
  Stripe: StripeLogo,
  Meta: MetaLogo,
  Netflix: NetflixLogo,
  Notion: NotionLogo,
  Spotify: SpotifyLogo,
  GitHub: GitHubLogo,
  Airbnb: AirbnbLogo,
  Figma: FigmaLogo,
  Linear: LinearLogo,
};
