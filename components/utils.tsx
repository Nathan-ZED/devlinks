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
    name: string;
    icon: IconType | React.ReactNode
}

export const TalentIO = () => {
    return <Image src="/images/talent.io-icon.svg" alt="talent.io" width={20} height={20} />
}

type Platforms = Platform[];

export const platforms: Platforms = [
    {
        name: 'Github',
        icon: FaGithub
    },
    {
        name: 'LinkedIn',
        icon: FaLinkedin
    },
    {
        name: 'Youtube',
        icon: FaYoutube
    },
    {
        name: 'Patreon',
        icon: FaPatreon
    },
    {
        name: 'X',
        icon: FaXTwitter
    },
    {
        name: 'Dev.to',
        icon: FaDev
    },
    {
        name: 'Codewars',
        icon: SiCodewars
    },
    {
        name: 'freeCodeCamp',
        icon: FaFreeCodeCamp
    },
    {
        name: 'Talent.io',
        icon: TalentIO
    },
    {
        name: 'FreeWork',
        icon: FaDev
    },
    {
        name: 'Gitlab',
        icon: FaGitlab
    },
    {
        name: 'Facebook',
        icon: FaFacebook
    },
    {
        name: 'Instagram',
        icon: FaInstagram
    },
]