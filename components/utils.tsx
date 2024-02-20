import { FaPatreon } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FaDev } from "react-icons/fa";
import { SiCodewars } from "react-icons/si";
import { FaFreeCodeCamp } from "react-icons/fa";
import { FaGitlab } from "react-icons/fa";
import { SiIndeed } from "react-icons/si";
import { FaFacebook } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import Image from "next/image";


export type Platform = {
    id?: number;
    name: string;
    color?: string;
    icon: IconType | React.ReactNode | string,
    url: string,
}

export const TalentIO = () => {
    return <Image src="/images/talent.io-icon.svg" alt="talent.io" width={20} height={20} />
}

type Platforms = Platform[];

export const platforms: Platforms = [
    {
        name: 'Github',
        icon: FaGithub,
        url: 'https://github.com'
    },
    {
        name: 'LinkedIn',
        icon: FaLinkedin,
        url: 'https://linkedin.com'
    },
    {
        name: 'Youtube',
        icon: FaYoutube,
        url: 'https://youtube.com'
    },
    {
        name: 'Patreon',
        icon: FaPatreon,
        url: 'https://patreon.com'
    },
    {
        name: 'X',
        icon: FaXTwitter,
        url: 'https://x.com'
    },
    {
        name: 'Dev.to',
        icon: FaDev,
        url: 'https://dev.to'
    },
    {
        name: 'Codewars',
        icon: SiCodewars,
        url: 'https://codewars.com'
    },
    {
        name: 'freeCodeCamp',
        icon: FaFreeCodeCamp,
        url: 'https://freecodecamp.com'
    },
    {
        name: 'Talent.io',
        icon: TalentIO,
        url: 'https://talent.io'
    },
    {
        name: 'FreeWork',
        icon: FaDev,
        url: 'https://freework.com'
    },
    {
        name: 'Gitlab',
        icon: FaGitlab,
        url: 'https://gitlab.com'
    },
    {
        name: 'Facebook',
        icon: FaFacebook,
        url: 'https://facebook.com'
    },
    {
        name: 'Instagram',
        icon: FaInstagram,
        url: 'https://instagram.com'
    },
]